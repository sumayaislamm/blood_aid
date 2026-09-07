import { prisma } from "../../lib/prisma";
import type {
    GetAdminBloodRequestsQuery,
  GetUsersQuery,
  UpdateBloodRequestStatusInput,
  UpdateUserStatusInput,
} from "./admin.interface";

export const getAllUsers = async (query: GetUsersQuery) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);

  const search = query.search?.trim();

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "name",
    "email",
    "role",
    "status",
  ];

  const sortBy = allowedSortFields.includes(query.sortBy || "")
    ? query.sortBy!
    : "createdAt";

  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

  const where = {
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          phone: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),
    ...(query.role && {
      role: query.role,
    }),
    ...(query.status && {
      status: query.status,
    }),
  };

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        googleId: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateUserStatus = async (
  adminId: string,
  userId: string,
  data: UpdateUserStatusInput
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.id === adminId && data.status !== "ACTIVE") {
    throw new Error("Admin cannot block or delete their own account");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      status: data.status,
      deletedAt:
        data.status === "DELETED"
          ? new Date()
          : null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminId,
      action: "UPDATE_STATUS",
      entity: "User",
      entityId: userId,
      details: {
        previousStatus: user.status,
        newStatus: data.status,
      },
    },
  });

  return updatedUser;
};

export const verifyDonation = async (
  adminId: string,
  donationId: string
) => {
  const donation = await prisma.donation.findUnique({
    where: { id: donationId },
  });

  if (!donation) {
    throw new Error("Donation not found");
  }

  if (donation.status !== "COMPLETED") {
    throw new Error(
      "Only completed donations can be verified"
    );
  }

  const verifiedDonation = await prisma.donation.update({
    where: { id: donationId },
    data: {
      status: "VERIFIED",
      verifiedAt: new Date(),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminId,
      action: "VERIFY",
      entity: "Donation",
      entityId: donationId,
      details: {
        previousStatus: donation.status,
        newStatus: "VERIFIED",
      },
    },
  });

  return verifiedDonation;
};

export const getAdminBloodRequests = async (
  query: GetAdminBloodRequestsQuery
) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(
    Math.max(Number(query.limit) || 10, 1),
    100
  );

  const search = query.search?.trim();

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "requiredDate",
    "units",
    "urgency",
    "status",
  ];

  const sortBy = allowedSortFields.includes(query.sortBy || "")
    ? query.sortBy!
    : "createdAt";

  const sortOrder = query.sortOrder === "asc" ? "asc" : "desc";

  const where = {
    deletedAt: null,

    ...(search && {
      OR: [
        {
          hospitalName: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          hospitalAddress: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          city: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),

    ...(query.bloodGroup && {
      bloodGroup: query.bloodGroup as any,
    }),

    ...(query.urgency && {
      urgency: query.urgency as any,
    }),

    ...(query.status && {
      status: query.status as any,
    }),

    ...(query.city && {
      city: {
        equals: query.city,
        mode: "insensitive" as const,
      },
    }),
  };

  const skip = (page - 1) * limit;

  const [bloodRequests, total] = await Promise.all([
    prisma.bloodRequest.findMany({
      where,
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        _count: {
          select: {
            responses: true,
            donations: true,
            payments: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    }),

    prisma.bloodRequest.count({ where }),
  ]);

  return {
    bloodRequests,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateBloodRequestStatus = async (
  adminId: string,
  bloodRequestId: string,
  data: UpdateBloodRequestStatusInput
) => {
  const bloodRequest = await prisma.bloodRequest.findFirst({
    where: {
      id: bloodRequestId,
      deletedAt: null,
    },
  });

  if (!bloodRequest) {
    throw new Error("Blood request not found");
  }

  if (bloodRequest.status === data.status) {
    throw new Error(
      `Blood request is already ${data.status}`
    );
  }

  const updatedRequest = await prisma.bloodRequest.update({
    where: {
      id: bloodRequestId,
    },
    data: {
      status: data.status,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminId,
      action: "UPDATE_STATUS",
      entity: "BloodRequest",
      entityId: bloodRequestId,
      details: {
        previousStatus: bloodRequest.status,
        newStatus: data.status,
      },
    },
  });

  return updatedRequest;
};
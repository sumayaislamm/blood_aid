import { prisma } from "../../lib/prisma";
import type {
  GetUsersQuery,
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

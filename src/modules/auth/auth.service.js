// import bcrypt from "bcrypt";
// import { prisma } from "../../lib/prisma";
// interface RegisterInput {
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   role: "DONOR" | "REQUESTER";
// }
// export const registerUser = async (data: RegisterInput) => {
//   const existingUser = await prisma.user.findUnique({
//     where: {
//       email: data.email,
//     },
//   });
//   if (existingUser) {
//     throw new Error("User with this email already exists");
//   }
//   const hashedPassword = await bcrypt.hash(data.password, 12);
//   const user = await prisma.user.create({
//     data: {
//       name: data.name,
//       email: data.email,
//       password: hashedPassword,
//       phone: data.phone ?? null,
//       role: data.role,
//     },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       phone: true,
//       role: true,
//       status: true,
//       createdAt: true,
//     },
//   });
//   return user;
// };
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
export const registerUser = async (data) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            phone: data.phone ?? null,
            role: data.role,
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            createdAt: true,
        },
    });
    return user;
};
export const loginUser = async (data) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordMatched = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
    }
    if (user.status !== "ACTIVE") {
        throw new Error("User account is not active");
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }
    const token = jwt.sign({
        userId: user.id,
        role: user.role,
        email: user.email,
    }, secret, {
        expiresIn: "7d",
    });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
        },
    };
};
//# sourceMappingURL=auth.service.js.map
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
if (!googleClientId) {
    throw new Error("GOOGLE_CLIENT_ID is not configured");
}
const googleClient = new OAuth2Client(googleClientId, process.env.GOOGLE_CLIENT_SECRET);
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
export const updateUser = async (userId, data) => {
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            ...(data.name !== undefined && { name: data.name }),
            ...(data.phone !== undefined && { phone: data.phone }),
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
        },
    });
    return user;
};
export const googleLogin = async (data) => {
    const ticket = await googleClient.verifyIdToken({
        idToken: data.idToken,
        audience: googleClientId,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.email) {
        throw new Error("Invalid Google account information");
    }
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name ?? "Google User";
    const avatar = payload.picture ?? null;
    let user = await prisma.user.findUnique({
        where: {
            googleId,
        },
    });
    if (!user) {
        user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            user = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    googleId,
                    avatar,
                },
            });
        }
    }
    if (!user) {
        user = await prisma.user.create({
            data: {
                name,
                email,
                password: "",
                googleId,
                avatar,
                role: "DONOR",
            },
        });
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
            avatar: user.avatar,
        },
    };
};
//# sourceMappingURL=auth.service.js.map
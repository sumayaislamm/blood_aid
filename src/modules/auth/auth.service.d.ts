interface RegisterInput {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: "DONOR" | "REQUESTER";
}
export declare const registerUser: (data: RegisterInput) => Promise<{
    createdAt: Date;
    email: string;
    id: string;
    name: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").UserRole;
    status: import("../../../generated/prisma/enums").UserStatus;
}>;
interface LoginInput {
    email: string;
    password: string;
}
export declare const loginUser: (data: LoginInput) => Promise<{
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        role: import("../../../generated/prisma/enums").UserRole;
        status: "ACTIVE";
    };
}>;
export {};
//# sourceMappingURL=auth.service.d.ts.map
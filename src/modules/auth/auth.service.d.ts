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
export {};
//# sourceMappingURL=auth.service.d.ts.map
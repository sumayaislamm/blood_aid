export interface JwtPayload {
    userId: string;
    role: "ADMIN" | "DONOR" | "REQUESTER";
    email: string;
}
export declare const verifyToken: (token: string) => JwtPayload;
//# sourceMappingURL=jwt.d.ts.map
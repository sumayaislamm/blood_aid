import { PaymentProvider, PaymentStatus } from "../../../generated/prisma/enums";
interface CreatePaymentInput {
    bloodRequestId: string;
    provider: PaymentProvider;
}
export declare const createPayment: (requesterId: string, data: CreatePaymentInput) => Promise<{
    paymentId: string;
    provider: PaymentProvider;
    amount: import("@prisma/client-runtime-utils").Decimal;
    currency: string;
    status: PaymentStatus;
    sessionId: string;
    checkoutUrl: string | null;
}>;
export {};
//# sourceMappingURL=payment.service.d.ts.map
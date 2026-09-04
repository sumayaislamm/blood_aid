export interface CreateBloodRequestInput {
  bloodGroup:
    | "A_POSITIVE"
    | "A_NEGATIVE"
    | "B_POSITIVE"
    | "B_NEGATIVE"
    | "AB_POSITIVE"
    | "AB_NEGATIVE"
    | "O_POSITIVE"
    | "O_NEGATIVE";
  units: number;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  requiredDate: string;
  urgency: "NORMAL" | "URGENT" | "CRITICAL";
  isPriority?: boolean;
  description?: string;
}
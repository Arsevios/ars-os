export type VerificationType = "self-check" | "output-match" | "checklist" | "manual-confirm";

export interface VerificationCriterion {
  id: string;
  description: string;
}

export interface Verification {
  type: VerificationType;
  criteria: VerificationCriterion[];
  exampleAnswer?: string;
}
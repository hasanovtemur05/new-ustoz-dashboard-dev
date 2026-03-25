import { z } from 'zod';

export const verificationSchema = z.object({
  reject_reason: z.string().min(1, "Rad etish sababini kiriting"),
});

export type VerificationFormValues = z.infer<typeof verificationSchema>;

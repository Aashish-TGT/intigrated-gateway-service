import { z } from 'zod';

export const TransactionSchema = z.object({
  transactionId: z.string().min(6),
  user: z.object({
    name: z.string().min(1),
    email: z.string().email()
  }),
  items: z.array(z.object({
    description: z.string().min(1),
    qty: z.number().int().positive(),
    unitPrice: z.number().nonnegative(),
    currency: z.string().length(3)
  })).nonempty(),
  taxAmount: z.number().nonnegative(),
  totalAmount: z.number().positive(),
  currency: z.string().length(3),
  paidAt: z.string().datetime()
});

export const GenerateRequestSchema = z.object({
  transaction: TransactionSchema,
  template: z.object({
    name: z.string().default('default'),
    version: z.string().default('v1')
  }).default({ name: 'default', version: 'v1' }),
  locale: z.string().default('en-IN')
});

import { z } from 'zod';

export const CalculationSchemeSchema = z
  .object({
    type: z.enum(['sum', 'formula']),
    formula: z.string().optional()
  })
  .refine(
    (data) => data.type === 'sum' || !!data.formula,
    {
      message: 'Formula is required when type = formula',
      path: ['formula']
    }
  )

export type CalculationScheme = z.infer<
  typeof CalculationSchemeSchema
>

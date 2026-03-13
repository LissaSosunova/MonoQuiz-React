import { z } from 'zod';
import { TranslationSchema } from './translations.schema';
import { CalculationSchemeSchema } from './calculation.schema';
import { QuestionSchema } from './question.schema';


export const TestCreateSchema = z.object({
  name: TranslationSchema,
  description: TranslationSchema.optional(),

  type: z.string().min(1, 'Type required'),
  category: z.string().min(1, 'Category required'),

  calculationScheme: CalculationSchemeSchema,

  questions: z
    .array(QuestionSchema)
    .min(1, 'At least one question'),

  price: z
    .number({
      error: 'Price must be number'
    })
    .min(0),

  image: z.string().optional()
})

export type TestCreateForm = z.infer<
  typeof TestCreateSchema
>

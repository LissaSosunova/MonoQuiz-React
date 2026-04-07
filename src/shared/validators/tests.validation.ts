import { z } from 'zod';
import { TranslationSchema } from './translations.schema';
import { CalculationSchemeSchema } from './calculation.schema';
import { QuestionSchema } from './question.schema';
import { ResultSchema } from './result.schema';


export const TestCreateSchema = z.object({
  name: TranslationSchema,
  description: TranslationSchema.optional(),

  type: z.string().min(1, 'Type required'),
  category: z.string().min(1, 'Category required'),

  calculationScheme: CalculationSchemeSchema,

  questions: z
    .array(QuestionSchema)
    .min(1, 'At least one question'),

  results: z
    .array(ResultSchema)
    .min(1, 'At least one result')
    .refine((results) => {
      // сортируем диапазоны по from
      const sorted = [...results].sort(
        (a, b) => a.score.from - b.score.from
      );

      // проверяем пересечения
      for (let i = 0; i < sorted.length - 1; i++) {
        const current = sorted[i];
        const next = sorted[i + 1];

        if (current.score.to >= next.score.from) {
          return false;
        }
      }

      return true;
    }, {
      message: 'Score ranges must not overlap'
    }),

  price: z
    .number({
      error: 'Price must be number'
    })
    .min(0)
    .nullable()
    .optional(),

  image: z.string().optional()
})


export type TestCreateForm = z.infer<
  typeof TestCreateSchema
>

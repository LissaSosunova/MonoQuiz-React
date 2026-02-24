import { z } from 'zod';
import { TranslationSchema } from './translations.schema';

export const AnswerSchema = z.object({
  translations: TranslationSchema,
  score: z
    .number({
      error: 'Score must be a number'
    })
    .min(0, 'Score must be >= 0')
})

export type Answer = z.infer<typeof AnswerSchema>

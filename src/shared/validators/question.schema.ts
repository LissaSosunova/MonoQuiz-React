import { z } from 'zod';
import { TranslationSchema } from './translations.schema';
import { AnswerSchema } from './answer.schema';

export const QuestionSchema = z.object({
  translations: TranslationSchema,
  answers: z
    .array(AnswerSchema)
    .min(1, 'At least one answer required')
})

export type Question = z.infer<typeof QuestionSchema>

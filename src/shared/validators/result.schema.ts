import { z } from 'zod';
import { TranslationSchema } from './translations.schema';

export const ResultSchema = z.object({
    translations: TranslationSchema,
    score: z.object({
        from: z
            .number({
                error: 'From must be a number'
            })
            .min(0, 'From must be >= 0'),
        to: z
            .number({
                error: 'To must be a number'
            })
            .min(0, 'To must be >= 0')
    })
})

export type Result = z.infer<typeof ResultSchema>
import { z } from 'zod'

export const TranslationSchema = z.object({
  en: z.string().min(1, 'Required'),
  uk: z.string().min(1, 'Required'),
  ru: z.string().min(1, 'Required')
})

export type Translation = z.infer<typeof TranslationSchema>

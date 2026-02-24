export type Translations = {
  en: { title: string; description: string }
  uk: { title: string; description: string }
  ru: { title: string; description: string }
}

export const languages = ['en', 'uk', 'ru'] as const
export type Language = typeof languages[number]

export type Translation = Record<Language, string>

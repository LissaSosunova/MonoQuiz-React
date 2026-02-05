export type Type = {
    _id?: string
    slug: string
    translations: {
        en: { title: string; description: string }
        uk: { title: string; description: string }
        ru: { title: string; description: string }
    }
    createdAt?: string
    updatedAt?: string

}
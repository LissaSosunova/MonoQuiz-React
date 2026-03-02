import { type Translation } from './translations';

export type Type = {
    _id?: string
    slug: string
    title: Translation
    description: Translation
    createdAt?: string
    updatedAt?: string

}
import { type Translation } from './translations';

export type Category = {
   _id?: string
    slug: string
    title: Translation
    description: Translation
    createdAt?: string
    updatedAt?: string
}
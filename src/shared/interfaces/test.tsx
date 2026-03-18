import { type Translation } from './translations';
import { type Question } from './question';

export interface Test {
    name: Translation
    description: Translation
    category: string
    type: string
    _id: string
    image: string
    calculationScheme: string
    questions: Question[]
    price: number | null
}
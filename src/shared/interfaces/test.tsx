import { type Translation } from './translations';
import { type Question } from './question';
import { type Result } from './results';

export interface Test {
    name: Translation
    description: Translation
    category: string
    type: string
    _id: string
    image: string
    calculationScheme: string
    questions: Question[]
    results: Result[]
    price: number | null
}
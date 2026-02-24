import { type Translation } from './translations';
import { type Answer } from './answer';

export type Question = {
    translations: Translation,
    answers: Answer[]
}
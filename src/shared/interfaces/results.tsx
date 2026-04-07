import { type Translation } from './translations';

export type Result = {
    translations: Translation,
    score: {
        from: number,
        to: number
    }
}
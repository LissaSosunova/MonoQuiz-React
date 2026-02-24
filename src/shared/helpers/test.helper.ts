import { type Translation } from '../interfaces/translations';
import {type Answer } from '../interfaces/answer';
import { type Question } from '../interfaces/question';

export const createEmptyTranslation = (): Translation => ({
  en: '',
  uk: '',
  ru: ''
})

export const createEmptyAnswer = (): Answer => ({
  translations: createEmptyTranslation(),
  score: 0
})


export const createEmptyQuestion = (): Question => ({
  translations: createEmptyTranslation(),
  answers: [createEmptyAnswer()]
})

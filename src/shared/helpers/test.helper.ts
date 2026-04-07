import { type Translation } from '../interfaces/translations';
import {type Answer } from '../interfaces/answer';
import { type Question } from '../interfaces/question';
import { type Result } from '../interfaces/results';

export const createEmptyTranslation = (): Translation => ({
  en: '',
  uk: '',
  ru: ''
})

export const createEmptyAnswer = (): Answer => ({
  translations: createEmptyTranslation(),
  score: 0
})


export const createEmptyResult = (): Result => ({
  translations: createEmptyTranslation(),
  score: {
    from: 1,
    to: 2
  }
})

export const createEmptyQuestion = (): Question => ({
  translations: createEmptyTranslation(),
  answers: [createEmptyAnswer()]
})

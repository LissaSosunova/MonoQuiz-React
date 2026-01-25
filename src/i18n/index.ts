import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './en/common.json'
import ukCommon from './uk/common.json'

i18n
  .use(initReactI18next)
  .init({
    lng: 'uk',                 // язык по умолчанию
    fallbackLng: 'en',

    ns: ['common'],
    defaultNS: 'common',

    resources: {
      en: {
        common: enCommon
      },
      uk: {
        common: ukCommon
      }
    },

    interpolation: {
      escapeValue: false
    }
  })

export default i18n

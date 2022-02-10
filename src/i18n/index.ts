import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_US from './messages_en_US.json'
import zh_CN from './messages_zh_CN.json'
import { getLanguage } from './getLocalLanguage'

const resources = {
  en_US: {
    translation: en_US,
  },
  zh_CN: {
    translation: zh_CN,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getLanguage(),

    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n

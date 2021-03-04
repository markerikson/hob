import resources from '../i18next/translations.json'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es', // use en if detected lng is not available
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

  i18n.on('languageChanged', function(lng) {
    // then re-render your app
    //App.render();
  })

export default i18n
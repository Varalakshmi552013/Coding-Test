import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        en: {
            translation: {
                "search": "Search  Here",
                "title": "Welcome to Nui Care Centers"
            }
        },
        de: {
            translation: {
                "search": "Search  Here",
                "title": "Welcome to Nui Care Centers"
            }
        }

    },
    lng: 'en'
})

export default i18n;
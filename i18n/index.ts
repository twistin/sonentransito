import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import gl from './locales/gl.json';
import es from './locales/es.json';
import en from './locales/en.json';

// Get saved language or default to Galician
const savedLanguage = localStorage.getItem('language') || 'gl';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            gl: { translation: gl },
            es: { translation: es },
            en: { translation: en },
        },
        lng: savedLanguage,
        fallbackLng: 'gl',
        interpolation: {
            escapeValue: false,
        },
    });

// Save language preference when changed
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback: (lng: string) => void) => {
        try {
            const savedLanguage = await AsyncStorage.getItem('userLanguage');
            callback(savedLanguage || 'en');
        } catch (e) {
            callback('en');
        }
    },
    init: () => {},
    cacheUserLanguage: async (lng: string) => {
        await AsyncStorage.setItem('userLanguage', lng);
    },
};

i18n
    .use(languageDetector as any)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            pt: { translation: pt },
            es: { translation: es },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

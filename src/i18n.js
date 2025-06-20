import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import ruCommon from './locales/ru/common.json';
import enRegister from './locales/en/register.json';
import ruRegister from './locales/ru/register.json';
import enLogin from './locales/en/login.json';
import ruLogin from './locales/ru/login.json';
import enProfile from './locales/en/profile.json';
import ruProfile from './locales/ru/profile.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        register: enRegister,
        login: enLogin,
        profile: enProfile,
      },
      ru: {
        common: ruCommon,
        register: ruRegister,
        login: ruLogin,
        profile: ruProfile,
      },
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    ns: ['common', 'register', 'login', 'profile'],
    defaultNS: 'common',
    debug: true, 
  });

export default i18n;
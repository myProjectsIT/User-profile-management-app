import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
const { i18n } = useTranslation();

  return (
    <select
      className="bg-gray-100 border border-gray-300 rounded-md py-2 px-2 sm:px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer transition-all duration-300 hover:-translate-y-1"
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem('language', e.target.value);
      }}
      value={i18n.language}
    >
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
};

export default LanguageSwitcher;


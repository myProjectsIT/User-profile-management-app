import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SunIcon from "../../assets/sun.svg";
import CrescentIcon from "../../assets/crescent.svg";


const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { t } = useTranslation('common');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

    let initialTheme: 'light' | 'dark';

    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = prefersDark ? 'dark' : 'light';
    }

    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    localStorage.setItem('theme', initialTheme);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none hover:filter hover:opacity-50 cursor-pointer transition-all duration-300 transition-all duration-300 hover:-translate-y-1"  
      aria-label={theme === 'light' ? t('switchToDarkTheme') : t('switchToLightTheme')}
    >

    {theme === 'light' ? 
      <CrescentIcon
        className="w-8 h-8 self-center" 
        aria-label={t('logout')}
    />
      : 
      <SunIcon
        className="w-8 h-8 self-center" 
        aria-label={t('logout')}
    />
      }
    </button>
  );
};

export default ThemeSwitcher;


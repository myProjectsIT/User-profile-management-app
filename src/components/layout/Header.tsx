import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeSwitcher from '../../components/common/ThemeSwitcher'; 
import { useAuth } from '../../hooks/useAuth';
import LogoutIcon from '../../assets/logout.svg';


const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="bg-white dark:bg-gray-800 py-4 px-6  shadow-md z-10 dark:bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold dark:text-white  text-gray-700">{t('profile')}</h1>
        <nav>
          <div className="flex items-center justify-items-center justify-between gap-3 sm:gap-5">
            <LanguageSwitcher />
            <ThemeSwitcher />
            {!isAuthPage && isAuthenticated && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 sm:px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all duration-300 hover:-translate-y-1 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleLogout}
                aria-label={t('logout')}
              >
                <span className="hidden sm:inline">{t('logout')}</span>
                <LogoutIcon
                  className="w-6 h-6 self-center sm:hidden"
                  aria-label={t('logout')}
                />
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;


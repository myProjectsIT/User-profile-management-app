import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const RegisterPage: React.FC = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSuccess = (token: string) => {
    login(token);
    navigate('/profile');
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen overflow-hidden text-gray-700 dark:text-gray-200" >
      <Header />
      <main className="py-8 px-6 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              {error}
            </div>
          )}
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;


import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth'; 

const LoginPage: React.FC = () => {
  const { login, error } = useAuth(); 

  const handleLoginSuccess = (token: string) => {
    login(token); 
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen overflow-hidden">
      <Header />
      <main className="py-8 px-6 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
        <div className="container py-4">
          <div className="max-w-md mx-auto">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                {error}
              </div>
            )}
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;


import React from 'react';
import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import Loader from '../../components/common/Loader'; 

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { t: tCommon } = useTranslation('common');
  const { t: tLogin } = useTranslation('login');
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setLoginError(null);
    try {
      const response = await api.post('/login', data);
      const token = response.data.token;

      if (token) {
        onLoginSuccess(token);
      } else {
        console.error('LoginForm: Login failed: Token not found');
        setLoginError(tCommon('error'));
      }
    } catch (error: any) {
      console.error('LoginForm: Login failed:', error.response?.data || error.message);
      setLoginError(tCommon('error'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-300 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] bg-white rounded my-4 p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-500"
    >
      <h2 className="text-2xl font-bold mb-4" id="login-form-title">{tLogin('title')}</h2>
      {loginError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {loginError}
        </div>
      )}
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="email"
        >
          {tCommon('email')}
        </label>
        <input
          className="shadow appearance-none border border-gray-500 focus:border-gray-900 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-500 dark:focus:border-gray-300"
          id="email"
          type="email"
          placeholder={tCommon('email')}
          {...register('email', {
            required: {
              value: true,
              message: tLogin('validation.emailRequired'),
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: tLogin('validation.emailInvalid'),
            },
          })}
          aria-label={tCommon('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby="email-error"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic mt-1" id="email-error">{(errors.email.message as string)}</p>
        )}
      </div>
      <div className="mb-8">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="password"
        >
          {tCommon('password')}
        </label>
        <input
          className="shadow appearance-none border border-gray-500 focus:border-gray-900 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:focus:border-gray-300"
          id="password"
          type="password"
          placeholder={tCommon('password')}
          {...register('password', {
            required: {
              value: true,
              message: tLogin('validation.passwordRequired'),
            },
          })}
          aria-label={tCommon('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby="password-error"
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic mt-1" id="password-error">{(errors.password.message as string)}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
        <button
          className="w-full sm:w-auto sm:min-w-[5.2rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all duration-300 hover:-translate-y-1"
          type="submit"
          disabled={isSubmitting}
          aria-label={isSubmitting ? tCommon('loading') : tLogin('submitButton')}
        >
          {isSubmitting ? <Loader /> : <span role="text">{tLogin('submitButton')}</span>}
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-center text-blue-500 hover:text-blue-700 dark:text-blue-300 cursor-pointer transition-all duration-300 hover:-translate-y-1"
          href="/register"
        >
          {tLogin('registerLink')}
        </a>
      </div>
    </form>
  );
};

export default LoginForm;


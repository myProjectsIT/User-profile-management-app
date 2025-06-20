import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { registerUser, loginUser } from '../../services/api';
import Loader from '../../components/common/Loader'; 

interface RegisterFormProps {
  onRegisterSuccess: (token: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    mode: 'onChange',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const { t: tRegister } = useTranslation('register');
  const { t: tCommon } = useTranslation('common');

  const password = watch('password');

  const onSubmit = async (data: any) => {
    setError(null);
    setSuccessMessage(null); 

    try {
      await registerUser({ email: data.email, password: data.password });
      console.log('Registration successful');
      setSuccessMessage(tCommon('success')); 

      try {
        const loginResponse = await loginUser({ email: data.email, password: data.password });

        if (loginResponse && loginResponse.data && loginResponse.data.token) {
          const token = loginResponse.data.token;

          onRegisterSuccess(token);
        } else {
          console.error('RegisterForm: Token not found in login response:', loginResponse);
          setError(tCommon('error'));
        }
      } catch (loginError: any) {
        console.error('RegisterForm: Auto-login failed:', loginError);
        setError(tCommon('error'));
      }
    } catch (registrationError: any) {
      console.error('RegisterForm: Registration failed:', registrationError);
      setError(tCommon('error'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-300 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] bg-white rounded p-6 sm:p-8 my-4 dark:bg-gray-800 dark:border-gray-500"
    >
      <h2 className="text-2xl font-bold mb-4" id="register-form-title">{tRegister('title')}</h2>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          {successMessage}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
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
              message: tRegister('validation.emailRequired'),
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: tRegister('validation.emailInvalid'),
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
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="password">
          {tCommon('password')}
        </label>
        <input
          className="shadow appearance-none border border-gray-500 focus:border-gray-900 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-500 dark:focus:border-gray-300"
          id="password"
          type="password"
          placeholder={tCommon('password')}
          {...register('password', {
            required: {
              value: true,
              message: tRegister('validation.passwordRequired'),
            },
            minLength: {
              value: 6,
              message: tRegister('validation.passwordMinLength'),
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
      <div className="mb-8">
        <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
          {tRegister('confirmPassword')}
        </label>
        <input
          className="shadow appearance-none border border-gray-500 focus:border-gray-900 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-500 dark:focus:border-gray-300"
          id="confirmPassword"
          type="password"
          placeholder={tRegister('confirmPassword')}
          {...register('confirmPassword', {
            required: {
              value: true,
              message: tRegister('validation.confirmPasswordRequired'),
            },
            validate: (value) => value === password || tRegister('validation.passwordsNotMatch'),
          })}
          aria-label={tRegister('confirmPassword')}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          aria-describedby="confirmPassword-error"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic mt-1" id="confirmPassword-error">{(errors.confirmPassword.message as string)}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center sm:justify-between gap-4">
        <button
          className="w-full sm:w-auto sm:min-w-[5.2rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all duration-300 hover:-translate-y-1"
          type="submit"
          disabled={isSubmitting}
          aria-label={isSubmitting ? tCommon('loading') : tRegister('submitButton')}
        >
          {isSubmitting ? <Loader /> : <span role="text">{tRegister('submitButton')}</span>}
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700 dark:text-blue-300 cursor-pointer transition-all duration-300 hover:-translate-y-1"
          href="/login"
        >
          {tRegister('loginLink')}
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;


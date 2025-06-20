import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Loader from '../components/common/Loader';

const ProfilePage: React.FC = () => {
  const { userData, setUserData, error: authError, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const { t } = useTranslation('profile');

  useEffect(() => {
    if (userData) {
      setEditedFirstName(userData.data.first_name || '');
      setEditedLastName(userData.data.last_name || '');
    }
  }, [userData]);

  const handleUpdateProfile = async () => {
    setSuccessMessage(null);
    setError(null);

    if (!navigator.onLine) {
      setError(t('   There is no Internet connection')); 
      return;
    }

    try {
      if (userData) {

        setUserData(prevState => {
          if (prevState && prevState.data) {
            const updatedUserData = {
              ...prevState,
              data: {
                ...prevState.data,
                first_name: editedFirstName,
                last_name: editedLastName,
              },
              support: prevState.support
            };
            sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
            return updatedUserData;
          }
          return prevState;
        });
        setSuccessMessage(t('success'));
        setIsEditing(false);
      }
    } catch (err: any) {
      console.error('Error updating profile:', err.response?.data || err.message);
      if (err.message === 'Failed to fetch') {
        setError(t('networkError')); 
      } else {
        setError(err.response?.data?.error || t('error'));
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedFirstName(userData!.data.first_name);
    setEditedLastName(userData!.data.last_name);
  };

  if (loading || !userData) {
    return <Loader />;
  }

  if (error || authError) {
    return (
      <div className="text-red-500">
        {error || authError}
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen overflow-hidden">
      <Header />
      <main className="py-8 px-6 text-gray-700 bg-gray-100 dark:bg-gray-900 w-full text-gray-700 dark:text-gray-200">
        <div className="container mx-auto flex items-center justify-center ">
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">{t('title')}</h1>
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                {successMessage}
              </div>
            )}
            {userData && (
              <div className="border border-gray-300 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] rounded p-6 sm:p-8 dark:bg-gray-800 max-w-200 mx-auto dark:border-gray-500">
                <img src={userData.data.avatar} alt={`${userData.data.first_name} ${userData.data.last_name}`} className="rounded-full w-32 h-32 mx-auto mb-4" />
                {isEditing ? (
                  <>
                    <div className="mb-2">
                      <label className="block text-sm font-bold mb-2" htmlFor="firstName">
                        {t('firstName')}:
                      </label>
                      <input
                        className="shadow appearance-none border border-gray-500 focus:border-gray-900 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-500 dark:focus:border-gray-300"
                        id="firstName"
                        type="text"
                        value={editedFirstName}
                        onChange={(e) => setEditedFirstName(e.target.value)}
                        aria-label={t('firstName')}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="lastName">
                        {t('lastName')}:
                      </label>
                      <input
                        className="shadow appearance-none border border-gray-500 focus:border-gray-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:focus:border-gray-300"
                        id="lastName"
                        type="text"
                        value={editedLastName}
                        onChange={(e) => setEditedLastName(e.target.value)}
                        aria-label={t('lastName')}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700 mb-2 dark:text-white">
                      {t('firstName')}: {userData.data.first_name}
                    </p>
                    <p className="text-gray-700 mb-2 dark:text-white">
                      {t('lastName')}: {userData.data.last_name}
                    </p>
                  </>
                )}
                <p className="text-gray-700 mb-4 dark:text-white">
                  {t('email')}: {userData.data.email}
                </p>
                {userData.support && (
                  <>
                    <h3 className="text-lg font-semibold mb-2 dark:text-white"> {t('support')}</h3>
                    <p className="text-gray-700 mb-6 dark:text-white ">
                      {/* <a className="cursor-pointer transition-all duration-300 hover:text-gray-500 mb-6 dark:hover:text-gray-300  block transition-all duration-300 hover:-translate-y-1 " href={userData.support.url} target="_blank" rel="noopener noreferrer"> */}
                      <a className="cursor-pointer transition-all duration-300 text-blue-500 hover:text-blue-900 dark:text-blue-300 sm:hover:text-blue-700 block transition-all duration-300 hover:-translate-y-1 " href={userData.support.url} target="_blank" rel="noopener noreferrer">
                        {userData.support.text}
                      </a>
                    </p>
                  </>
                )}
                {isEditing ? (
                  <div className="mx-auto flex justify-center gap-4">
                    <button onClick={handleUpdateProfile} className="min-w-[5.2rem] block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
                      {t('saveButton')}
                    </button>
                    <button onClick={handleCancelClick} className="min-w-[5.2rem]block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all duration-300 hover:-translate-y-1">
                      {t('cancelButton')}
                    </button>
                  </div>
                ) : (
                  <button onClick={handleEditClick} className="mx-auto min-w-[5.2rem] block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all duration-300 hover:-translate-y-1 ">
                    {t('editProfileButton')}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;


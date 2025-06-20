import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/userService';

interface UserData {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: {
    url: string;
    text: string;
  };
}

interface AuthContextProps {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  isAuthenticated: false,
  loading: false,
  login: () => { },
  logout: () => { },
  userData: null,
  setUserData: () => { },
  error: null,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(() => {
    const storedUserData = sessionStorage.getItem('userData');
    console.log('useAuth: Initial userData from sessionStorage:', storedUserData);
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      if (token) {
        const storedUserData = sessionStorage.getItem('userData');
        if (storedUserData) {
          console.log('useAuth: Using userData from sessionStorage');
          setUserData(JSON.parse(storedUserData));
          setIsAuthenticated(true);
        }
        else {
          try {
            const profile = await getUserProfile(2);
            console.log('useAuth: Fetched profile data:', profile);
            setUserData(profile);
            sessionStorage.setItem('userData', JSON.stringify(profile)); 
            console.log('useAuth: Saved userData to sessionStorage:', profile);
            setIsAuthenticated(true);
            setError(null);
          } catch (error: any) {
            console.error('useAuth: Error loading user profile:', error);
            setError(error.message || 'Failed to load user profile.'); 
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userData'); 
            setToken(null);
            setUserData(null);
            setIsAuthenticated(false);
          }
        }
      }
      setLoading(false);
    };

    loadUserProfile();
  }, [token]);

  useEffect(() => {
    if (userData) {
      console.log('useAuth: Setting userData in sessionStorage:', userData);
      sessionStorage.setItem('userData', JSON.stringify(userData));
    } else {
      console.log('useAuth: Removing userData from sessionStorage');
      sessionStorage.removeItem('userData');
    }
  }, [userData]);

  const login = (token: string) => {
    sessionStorage.setItem('token', token);
    setToken(token);
    setIsAuthenticated(true);
    navigate('/profile');
    setError(null)
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
    navigate('/login');
    setError(null)
  };

  const value: AuthContextProps = {
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    userData,
    setUserData,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


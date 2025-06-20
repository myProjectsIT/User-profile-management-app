import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth, AuthProvider } from './hooks/useAuth';
import Loader from './components/common/Loader';
import ErrorBoundary from './components/ErrorBoundary'; 

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <ProfilePage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/profile" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/profile" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;

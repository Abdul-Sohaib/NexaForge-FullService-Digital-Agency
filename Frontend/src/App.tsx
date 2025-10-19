import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Loading } from './components/Loading';
import { useAuth } from './hooks/useAuth';
import WorkSamples from './components/WorkSamples';
import SplashScreen from './components/SplashScreen';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const { loading } = useAuth();
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (location.state?.showSplash) {
      setShowSplash(true);
    }
  }, [location.state]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {showSplash && location.pathname === '/worksamples' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Page</h1>
                  <p className="text-gray-600">This is a protected route - only authenticated users can see this.</p>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/worksamples" element={<WorkSamples />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
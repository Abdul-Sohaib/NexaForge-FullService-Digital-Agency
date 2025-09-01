import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Loading } from './components/Loading';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  const { loading } = useAuth();

  // Show loading spinner while checking authentication status
  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={<Auth />} 
      />
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
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
      <Route 
        path="/" 
        element={<Navigate to="/dashboard" replace />} 
      />
    </Routes>
  );
}

export default App;
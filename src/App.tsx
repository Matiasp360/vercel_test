import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import { AlertProvider } from './utils/context/AlertContext';

const App: React.FC = () => {
  return (
    <Router>
      <AlertProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AlertProvider>
    </Router>
  );
}

export default App;

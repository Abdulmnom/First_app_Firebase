import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import React from 'react';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;

import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return token && isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;

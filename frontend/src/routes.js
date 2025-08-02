import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TicketDetail from './pages/TicketDetail';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tickets/:id" element={<TicketDetail />} />
      <Route path="/" element={<Login />} />
    </RouterRoutes>
  );
};

export default Routes;
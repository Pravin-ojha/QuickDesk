import React, { createContext, useState, useEffect } from 'react';
import { login, register } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // Simplified; fetch user data from API if needed
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    const response = await login(email, password);
    localStorage.setItem('token', response.token);
    setUser({ token: response.token, role: response.role });
  };

  const registerUser = async (email, password) => {
    const response = await register(email, password);
    localStorage.setItem('token', response.token);
    setUser({ token: response.token, role: response.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
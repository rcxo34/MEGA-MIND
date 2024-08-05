// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  });

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const login = ({ token, role }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuthState({ token, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthState({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, getToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

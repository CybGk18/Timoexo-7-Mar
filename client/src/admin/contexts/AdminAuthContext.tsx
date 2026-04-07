import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  permissions: string[] | null;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: () => Promise<boolean>;
  hasPermission: (module: string) => boolean;
  isSuperAdmin: () => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.auth.check();
        if (response.success && response.authenticated && response.user) {
          setIsAuthenticated(true);
          setUser(response.user);
        }
      } catch (error) {
        console.warn('Auth check skipped - backend not available:', error);
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.auth.login(username, password);
      if (response.success && response.user) {
        setIsAuthenticated(true);
        setUser(response.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const forgotPassword = async (): Promise<boolean> => {
    try {
      const response = await api.auth.forgotPassword();
      return response.success;
    } catch (error) {
      console.error('Forgot password failed:', error);
      return false;
    }
  };

  const hasPermission = (module: string): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    if (!user.permissions || user.permissions.length === 0) return false;
    return user.permissions.includes(module);
  };

  const isSuperAdmin = (): boolean => {
    return user?.role === 'super_admin';
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, login, logout, forgotPassword, hasPermission, isSuperAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

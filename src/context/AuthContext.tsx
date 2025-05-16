import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
  isOrganizer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string): Promise<User | null> => {
    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find user with matching email
        const user = users.find(u => u.email === email);
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
          resolve(user);
        } else {
          resolve(null);
        }
      }, 800);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const isOrganizer = currentUser?.role === 'organizer';

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, isOrganizer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
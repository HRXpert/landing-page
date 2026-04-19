'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMe } from '../api/auth/auth';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  username: string;
  isVerified: boolean;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore user session from cookies on mount
    const restoreSession = async () => {
      try {
        const result = await fetchMe();
        if (result.success && result.data) {
          setUser(result.data);
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/api';

interface User {
  id: string;
  name: string;
  current_location: string | null;
  profile_pic?: string | null;
  streak_count?: number;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Patrick Fung's user ID from the database
        const patrickFungId = 'patrick_fung';
        const userData = await userService.getUserById(patrickFungId);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error initializing user:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 
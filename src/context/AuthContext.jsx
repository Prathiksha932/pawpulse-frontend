import { createContext, useContext, useState, useEffect } from 'react';
import axiosClient, { setAccessToken } from '../api/axiosClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const attemptSilentLogin = async () => {
      try {
        const { data } = await axiosClient.post('/auth/refresh-token');
        setAccessToken(data.data.accessToken);

        const meResponse = await axiosClient.get('/users/me');
        setUser(meResponse.data.data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    attemptSilentLogin();
  }, []);

  const login = (userData, accessToken) => {
    setAccessToken(accessToken);
    setUser(userData);
  };

  const logout = async () => {
    await axiosClient.post('/auth/logout');
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
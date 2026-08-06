import { createContext, useContext, useState, useEffect } from 'react';
import axiosClient, { setAccessToken } from '../api/axiosClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessTokenState, setAccessTokenState] = useState(null);

  useEffect(() => {
    const attemptSilentLogin = async () => {
      try {
        const { data } = await axiosClient.post('/auth/refresh-token');
        setAccessToken(data.data.accessToken);
        setAccessTokenState(data.data.accessToken);

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

  const login = (userData, token) => {
    setAccessToken(token); // module-level variable, read synchronously by axios interceptors
    setAccessTokenState(token); // React state, so effects (like SocketContext's) can react to changes
    setUser(userData);
  };

  const logout = async () => {
    await axiosClient.post('/auth/logout');
    setAccessToken(null);
    setAccessTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, accessToken: accessTokenState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
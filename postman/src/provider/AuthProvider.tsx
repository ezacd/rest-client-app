'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { setCookie, deleteCookie } from 'cookies-next';

const Context = createContext({});

type UserT = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  isLogin: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const initialState = {
    user: null,
    isLogin: false,
  };
  const [user, setUser] = useState<UserT>(initialState);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(async (userState) => {
      if (userState) {
        const token = await userState.getIdToken(); // Получаем токен
        setCookie('token', token, { path: '/', maxAge: 60 * 60 * 24 }); // Сохраняем в cookies на 24 часа
        setUser({ isLogin: true, user: userState });
      } else {
        deleteCookie('token'); // Удаляем куки при разлогинивании
        setUser({ isLogin: false, user: null });
      }
      setLoading(false);
    });

    return () => subscribe();
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {loading && <div>Loading...</div>}
      {!loading && children}
    </Context.Provider>
  );
};

export const AuthContext = () => useContext(Context);

export default AuthProvider;

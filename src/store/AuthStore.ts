import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import AsyncStorage from '@lib/storage';

export interface ICommon {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  [prop: string]: any;
}

const AuthStore = create<ICommon>()(
  devtools(
    persist(
      set => ({
        isLoggedIn: false,
        setLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      }),
      {
        name: 'auth',
        getStorage: () => AsyncStorage,
      },
    ),
  ),
);

export default AuthStore;

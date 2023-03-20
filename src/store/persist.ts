import AsyncStorage from '@react-native-async-storage/async-storage';
import {configurePersist} from 'zustand-persist';

const {persist} = configurePersist({
  storage: {
    getItem: async (key: string) => {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : undefined;
    },
    setItem: async (key: string, value: any) => {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async (key: string) => {
      await AsyncStorage.removeItem(key);
    },
  },
  rootKey: 'app',
});

export default persist;

import { createJSONStorage, StateStorage } from "zustand/middleware";
import * as SecureStore from 'expo-secure-store';

const storageAPI: StateStorage = {

  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async  (name: string, value: string): Promise<null> => {
    await SecureStore.setItemAsync(name, value);
    return null
  },
  removeItem: async (name: string): Promise<null> => {
    await SecureStore.deleteItemAsync(name);
    return null
  }

}

export const customSessionStorage = createJSONStorage( () => storageAPI )
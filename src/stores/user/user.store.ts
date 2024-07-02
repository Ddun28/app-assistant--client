import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware"
import { IUser } from "../../schemas/user.scheme";
import { customSessionStorage } from "../storage/secure-storage.storage";
import * as SecureStore from 'expo-secure-store';

interface UserState {
  user: Omit<IUser, "createdAt" | "updatedAt">;
  token: string;
}

interface Actions {
  handleUserLogin: (user: IUser, token: string) => void

  handleUserLogout: () => void
}

const storeAPI: StateCreator<UserState & Actions> = (set) => (
  {
    user: {
      _id: "123",
      firstname: "",
      lastname: "",
      document: "",
      password: "",
      access: "student",
    },

    token: "123",
    handleUserLogin: (user: IUser, token: string) => {
      set( () => ({ user: user, token: token }) )
    },

    handleUserLogout: () => {
      customSessionStorage?.removeItem("user")
      set( () => ({
        user: undefined,
        token: undefined,
      }) )
    }
  }
)

export const useUserStorage = create<UserState & Actions>()(
  persist(
    storeAPI, {
      name: "user-storage",
      storage: customSessionStorage
    }
  )
);

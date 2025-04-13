import { create } from "zustand";
import { IUser } from "../../interfaces";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  currentUser: IUser | null;
  isLogin: boolean;
};

type AuthAction = {
  setCurrentUser: (currentUser: IUser | null) => void;
  clearCurrentUser: () => void;
  setIsLogin: () => void;
  setIsLogout: () => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: () => set({ isLogin: true }),
      setIsLogout: () => set({ isLogin: false }),
      currentUser: null,
      setCurrentUser: (currentUser) => set({ currentUser }),
      clearCurrentUser: () => set({ currentUser: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

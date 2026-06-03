import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  username: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;

  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,

      login: (user, token, refreshToken) => set({ user, token, refreshToken }),
      logout: () => set({ user: null, token: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

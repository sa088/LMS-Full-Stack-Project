import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,

      // Called after a successful login/register API call
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),

      // Clears everything — used on logout and on 401 responses
      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      // Merges partial changes into the existing user object
      // (used by the Profile page, since there's no PATCH /me endpoint yet)
      updateUser: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

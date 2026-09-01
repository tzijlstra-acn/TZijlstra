import { create } from "zustand";

const SESSION_KEY = "kimi-eu-auth";

function getInitialAuth(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: getInitialAuth(),
  login: () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEY, "1");
      }
    } catch {
      // ignore
    }
    set({ isAuthenticated: true });
  },
  logout: () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch {
      // ignore
    }
    set({ isAuthenticated: false });
  },
}));

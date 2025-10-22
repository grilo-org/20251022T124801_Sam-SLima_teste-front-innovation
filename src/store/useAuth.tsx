import { create } from "zustand";

type User = { id?: string; name?: string; email?: string };

type AuthState = {
  token: string | null;
  user: User | null;
  setToken: (token: string, user: User, manterLogado?: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token_de_acesso")
      : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setToken: (token, user, manterLogado = false) => {
    if (manterLogado) {
      localStorage.setItem("token_de_acesso", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem("token_de_acesso");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));

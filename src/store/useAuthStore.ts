import { create } from 'zustand';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    localStorage.setItem('taskflow_token', token);
    localStorage.setItem('taskflow_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('taskflow_token');
    localStorage.removeItem('taskflow_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  initialize: () => {
    const token = localStorage.getItem('taskflow_token');
    const userJson = localStorage.getItem('taskflow_user');
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        set({ user, token, isAuthenticated: true });
      } catch (e) {
        localStorage.removeItem('taskflow_token');
        localStorage.removeItem('taskflow_user');
      }
    }
  },
}));

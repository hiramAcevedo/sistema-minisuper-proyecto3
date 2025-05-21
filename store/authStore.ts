import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
};

// Mock data para usuarios (simulación)
const MOCK_USERS = [
  {
    id: 'usr_1',
    email: 'admin@minisuperweb.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin' as const,
    avatar: '/dogactually.webp'
  },
  {
    id: 'usr_2',
    email: 'usuario@minisuperweb.com',
    password: 'usuario123',
    name: 'Usuario Regular',
    role: 'customer' as const,
    avatar: '/dogactually.webp'
  }
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: (user) => {
        set({
          user,
          isAuthenticated: true,
          isAdmin: user.role === 'admin'
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false
        });
      }
    }),
    {
      name: 'minisuperweb-auth', // nombre para localStorage
    }
  )
);

// Función auxiliar para autenticar usuarios (simulación)
export const authenticateUser = (email: string, password: string): User | null => {
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (user) {
    // Omitir la contraseña antes de devolver el usuario
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  return null;
}; 
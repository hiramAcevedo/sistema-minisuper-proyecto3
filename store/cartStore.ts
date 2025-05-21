import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './authStore';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
};

type CartStore = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  userId: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setUserId: (userId: string | null) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      userId: null,
      
      setUserId: (userId) => {
        set({ userId });
        // Si el ID de usuario cambia a null (logout), limpiar el carrito
        if (userId === null) {
          set({
            items: [],
            totalItems: 0,
            totalPrice: 0
          });
        }
      },
      
      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex((i) => i.id === item.id && i.variant === item.variant);
        
        if (existingItemIndex !== -1) {
          // Si el item ya existe, actualiza su cantidad
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += item.quantity;
          
          set({
            items: updatedItems,
            totalItems: get().totalItems + item.quantity,
            totalPrice: get().totalPrice + (item.price * item.quantity)
          });
        } else {
          // Si es un nuevo item, agrégalo al array
          set({
            items: [...items, item],
            totalItems: get().totalItems + item.quantity,
            totalPrice: get().totalPrice + (item.price * item.quantity)
          });
        }
      },
      
      removeItem: (itemId) => {
        const { items } = get();
        const itemToRemove = items.find((i) => i.id === itemId);
        
        if (itemToRemove) {
          set({
            items: items.filter((i) => i.id !== itemId),
            totalItems: get().totalItems - itemToRemove.quantity,
            totalPrice: get().totalPrice - (itemToRemove.price * itemToRemove.quantity)
          });
        }
      },
      
      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        const itemIndex = items.findIndex((i) => i.id === itemId);
        
        if (itemIndex !== -1) {
          const item = items[itemIndex];
          const quantityDifference = quantity - item.quantity;
          
          const updatedItems = [...items];
          updatedItems[itemIndex].quantity = quantity;
          
          set({
            items: updatedItems,
            totalItems: get().totalItems + quantityDifference,
            totalPrice: get().totalPrice + (item.price * quantityDifference)
          });
        }
      },
      
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        });
      }
    }),
    {
      name: 'minisuperweb-cart', // nombre para localStorage
    }
  )
); 

// Hook de sincronización para mantener el carrito vinculado al usuario
export const useSyncCartWithUser = () => {
  const { userId, setUserId } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  
  // Si el estado de autenticación cambia, actualizar el userId en el carrito
  if (isAuthenticated && user && userId !== user.id) {
    setUserId(user.id);
  } else if (!isAuthenticated && userId !== null) {
    setUserId(null);
  }
}; 
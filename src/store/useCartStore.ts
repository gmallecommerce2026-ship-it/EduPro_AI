// src/store/useCartStore.ts (Nâng cấp từ zustand)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course } from '../types/course';

interface CartState {
  items: Course[];
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (course) => 
        set((state) => {
          if (state.items.find(i => i.id === course.id)) return state; // Tránh trùng lặp
          return { items: [...state.items, course] };
        }),
      removeItem: (id) => 
        set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + item.price.amount, 0),
    }),
    {
      name: 'udemy-cart-storage', // Lưu vào localStorage để không mất giỏ hàng
    }
  )
);
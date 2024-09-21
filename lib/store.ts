'use client';

import type {} from '@redux-devtools/extension'; // required for devtools typing
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  cartOpen: boolean;
  toggleCartOpen: () => void;

  viewingOrderId: string;
  setViewingOrderId: (id: string) => void;
}
export const useStore = create<AppState>()(
  devtools((set) => ({
    cartOpen: false,
    toggleCartOpen: () => set((state) => ({ cartOpen: !state.cartOpen })),

    viewingOrderId: '',
    setViewingOrderId: (id: string) => set((state) => ({ viewingOrderId: id })),
  })),
);

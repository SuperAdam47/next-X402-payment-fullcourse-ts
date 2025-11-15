'use client';

import { create } from 'zustand';

interface FaucetModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useFaucetModal = create<FaucetModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

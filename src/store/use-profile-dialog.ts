import { create } from 'zustand';

interface Store {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProfileDialog = create<Store>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

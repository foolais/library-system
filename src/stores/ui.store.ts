import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookTabs } from "../features/book/book.types";

interface UIState {
  isModalOpen: boolean;
  modalId: string | null;
  bookTabs: BookTabs;

  setModal: (isOpen: boolean, id: string | null) => void;
  setBookTabs: (tab: BookTabs) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isModalOpen: false,
      modalId: null,
      bookTabs: "all",

      setModal: (isOpen, id) => set({ isModalOpen: isOpen, modalId: id }),
      setBookTabs: (tab) => set({ bookTabs: tab }),
    }),
    {
      name: "lib-ui-storage",
      partialize: (state) => ({ bookTabs: state.bookTabs }),
    },
  ),
);

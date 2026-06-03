import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookTabs } from "../features/book/book.types";

interface UIState {
  isModalOpen: boolean;
  modalId: string | null;
  modalMode: "create" | "detail";
  bookTabs: BookTabs;

  setModal: (
    isOpen: boolean,
    id: string | null,
    mode?: "create" | "detail",
  ) => void;
  setBookTabs: (tab: BookTabs) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isModalOpen: false,
      modalId: null,
      modalMode: "detail",
      bookTabs: "all",

      setModal: (isOpen, id, mode = "detail") =>
        set({
          isModalOpen: isOpen,
          modalId: id,
          modalMode: isOpen ? mode : "detail",
        }),
      setBookTabs: (tab) => set({ bookTabs: tab }),
    }),
    {
      name: "lib-ui-storage",
      partialize: (state) => ({ bookTabs: state.bookTabs }),
    },
  ),
);

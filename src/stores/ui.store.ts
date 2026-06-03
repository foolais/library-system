import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookTabs } from "../features/book/book.types";

interface UIState {
  isModalOpen: boolean;
  modalId: string | null;
  modalMode: "create" | "detail";
  bookTabs: BookTabs;
  searchQuery: string;

  setModal: (
    isOpen: boolean,
    id: string | null,
    mode?: "create" | "detail",
  ) => void;
  setBookTabs: (tab: BookTabs) => void;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isModalOpen: false,
      modalId: null,
      modalMode: "detail",
      bookTabs: "all",
      searchQuery: "",

      setModal: (isOpen, id, mode = "detail") =>
        set({
          isModalOpen: isOpen,
          modalId: id,
          modalMode: isOpen ? mode : "detail",
        }),
      setBookTabs: (tab) => set({ bookTabs: tab }),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: "lib-ui-storage",
      partialize: (state) => ({ bookTabs: state.bookTabs }),
    },
  ),
);

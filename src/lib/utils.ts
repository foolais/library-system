import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "../stores/auth.store";
import { useUIStore } from "../stores/ui.store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAccessToken = () => {
  const state = useAuthStore.getState();

  if (state.token) return state.token;

  const storage = localStorage.getItem("auth-storage");

  if (!storage) return null;

  return JSON.parse(storage)?.state?.token;
};

export const resetTabs = () => {
  const setBookTabs = useUIStore.getState().setBookTabs;
  setBookTabs("all");
};

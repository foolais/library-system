import { useAuthStore } from "../stores/auth.store";
import { api } from "./axios";
import { getAccessToken, resetTabs } from "./utils";

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      resetTabs();
      useAuthStore.getState().logout();

      window.location.href = "/auth";
    }

    return Promise.reject(error);
  },
);

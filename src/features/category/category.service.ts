import { api } from "../../lib/axios";
import type { CategoryBook, PayloadCategoryBook } from "./category.type";

export const getAllCategoriesBooks = async (search?: string) => {
  const response = await api.get("/admin/buku/jenbuk", {
    params: search ? { q: search } : {},
  });

  return response.data;
};

export const getDetailCategoryBook = async (id: string) => {
  const response = await api.get(`/admin/buku/jenbuk/${id}`);

  return response.data;
};

export const createCategoryBook = async (payload: PayloadCategoryBook) => {
  const response = await api.post("/admin/buku/jenbuk/create", payload);

  return response.data;
};

export const updateCategoryBook = async (payload: CategoryBook) => {
  const response = await api.put("/admin/buku/jenbuk/update/", payload);

  return response.data;
};

export const deleteCategoryBook = async (id: string) => {
  const response = await api.delete("/admin/buku/jenbuk/delete", {
    data: { id },
  });

  return response.data;
};

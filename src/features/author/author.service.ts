import { api } from "../../lib/axios";
import type { AuthorBook, PayloadAuthorBook } from "./author.types";

export const getAllAuthorBook = async () => {
  const response = await api.get("/admin/buku/author");

  return response.data;
};

export const getDetailAuthorBook = async (id: string) => {
  const response = await api.get(`/admin/buku/author/${id}`);

  return response.data;
};

export const createAuthorBook = async (payload: PayloadAuthorBook) => {
  const response = await api.post("/admin/buku/author/create", payload);

  return response.data;
};

export const updateAuthorBook = async (payload: AuthorBook) => {
  const response = await api.put("/admin/buku/author/update/", payload);

  return response.data;
};

export const deleteAuthorBook = async (id: string) => {
  const response = await api.delete("/admin/buku/author/delete", {
    data: { id },
  });

  return response.data;
};

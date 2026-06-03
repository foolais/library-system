import { api } from "../../lib/axios";
import type { PayloadPublisherBook } from "./publisher.type";

export const getAllPublisherBook = async () => {
  const response = await api.get("/admin/buku/penbuk");

  return response.data;
};

export const getDetailPublisherBook = async (id: string) => {
  const response = await api.get(`/admin/buku/penbuk/${id}`);

  return response.data;
};

export const createPublisherBook = async (payload: PayloadPublisherBook) => {
  const response = await api.post("/admin/buku/penbuk/create", payload);

  return response.data;
};

export const updatePublisherBook = async (payload: PayloadPublisherBook) => {
  const response = await api.put("/admin/buku/penbuk/update/", payload);

  return response.data;
};

export const deletePublisherBook = async (id: string) => {
  const response = await api.delete("/admin/buku/penbuk/delete", {
    data: { id },
  });

  return response.data;
};

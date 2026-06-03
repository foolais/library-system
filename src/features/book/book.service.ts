import { api } from "../../lib/axios";

export const getAllBooks = async () => {
  const response = await api.get("/buku");

  return response.data;
};

export const getBookById = async (id: string) => {
  const response = await api.get(`/buku/${id}`);

  return response.data;
};

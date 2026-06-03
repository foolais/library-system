import { api } from "../../lib/axios";
import type { PayloadLoanCreate, PayloadLoanUpdate } from "./loan.type";

export const getAllLoan = async () => {
  const response = await api.get("/admin/peminjaman");

  return response.data;
};

export const getDetailLoan = async (id: string) => {
  const response = await api.get(`/admin/peminjaman/${id}`);

  return response.data;
};

export const getDetailInnerLoan = async (id: string) => {
  const response = await api.get(`/admin/peminjaman/detail/${id}`);

  return response.data;
};

export const createLoan = async (payload: PayloadLoanCreate) => {
  const response = await api.post("/admin/peminjaman/create", payload);

  return response.data;
};

export const updateLoan = async (payload: PayloadLoanUpdate) => {
  const response = await api.put("/admin/peminjaman/update", payload);

  return response.data;
};

export const deleteLoan = async (id: string) => {
  const response = await api.delete("/admin/peminjaman/delete", {
    data: { id_peminjaman: id },
  });

  return response.data;
};

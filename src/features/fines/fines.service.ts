import { api } from "../../lib/axios";
import type { PayloadFines } from "./fines.type";

export const getAllFines = async () => {
  const response = await api.get("/admin/denda");

  return response.data;
};

export const getDetailFine = async (id: string) => {
  const response = await api.get(`/admin/denda/${id}`);

  return response.data;
};

export const createFine = async (payload: PayloadFines) => {
  const mappedPayload = {
    ...payload,
    jumlah_denda: +payload.jumlah_denda,
  };
  const response = await api.post("/admin/denda/create", mappedPayload);

  return response.data;
};

export const updateFine = async (payload: PayloadFines) => {
  const mappedPayload = {
    ...payload,
    jumlah_denda: +payload.jumlah_denda,
  };
  const response = await api.put("/admin/denda/update/", mappedPayload);

  return response.data;
};

export const deleteFine = async (id: string) => {
  const response = await api.delete("/admin/denda/delete", {
    data: { id_denda: id },
  });

  return response.data;
};

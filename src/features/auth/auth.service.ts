import { api } from "../../lib/axios";

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  const response = await api.post("/login", payload);
  return response;
};

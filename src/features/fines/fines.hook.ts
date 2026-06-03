import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFine,
  deleteFine,
  getAllFines,
  getDetailFine,
  updateFine,
} from "./fines.service";
import { useUIStore } from "../../stores/ui.store";
import toast from "react-hot-toast";
import type { IFines } from "./fines.type";

export const useFines = () => {
  return useQuery({
    queryKey: ["all-fines"],
    queryFn: () => getAllFines(),
  });
};

export const useFine = (id: string) => {
  return useQuery({
    queryKey: ["fine", id],
    queryFn: () => getDetailFine(id),
  });
};

export const useCreateFine = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: createFine,
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-fines"] });

      setModal(false, null);
      toast.success(response.status || "fines book created successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      const serverErrorMessage = error?.response?.data?.msg;

      if (error?.response?.status === 401) {
        toast.error(
          serverErrorMessage || "Invalid credentials. Please try again.",
        );
      } else if (error?.response?.status === 502) {
        toast.error(serverErrorMessage || ".");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useUpdateFine = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: ({ data }: { id: string; data: IFines }) => updateFine(data),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-fines"] });
      queryClient.invalidateQueries({ queryKey: ["fine"] });

      setModal(false, null);
      toast.success(
        response.msg || response.status || "fines book created successfully!",
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      const serverErrorMessage = error?.response?.data?.msg;

      if (error?.response?.status === 401) {
        toast.error(
          serverErrorMessage || "Invalid credentials. Please try again.",
        );
      } else if (error?.response?.status === 502) {
        toast.error(serverErrorMessage || ".");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useDeleteFine = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: (id: string) => deleteFine(id),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-fines"] });

      setModal(false, null);
      toast.success(response.msg || "fines book deleted successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      const serverErrorMessage = error?.response?.data?.msg;

      if (error?.response?.status === 401) {
        toast.error(
          serverErrorMessage || "Invalid credentials. Please try again.",
        );
      } else if (error?.response?.status === 502) {
        toast.error(serverErrorMessage || ".");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
  });
};

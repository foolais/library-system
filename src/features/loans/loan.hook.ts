import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLoan,
  deleteLoan,
  getAllLoan,
  getDetailInnerLoan,
  getDetailLoan,
  updateLoan,
} from "./loan.service";
import { useUIStore } from "../../stores/ui.store";
import toast from "react-hot-toast";
import type { PayloadLoanUpdate } from "./loan.type";

export const useLoans = () => {
  return useQuery({
    queryKey: ["all-loans"],
    queryFn: () => getAllLoan(),
  });
};

export const useLoan = (id: string) => {
  return useQuery({
    queryKey: ["loan", id],
    queryFn: () => getDetailLoan(id),
  });
};

export const useLoanInnerDetail = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["loan-inner", id],
    queryFn: () => getDetailInnerLoan(id),
    enabled: enabled,
  });
};

export const useCreateLoan = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: createLoan,
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-loans"] });

      setModal(false, null);
      toast.success(response.status || "loans created successfully!");
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

export const useUpdateLoan = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: ({ data }: { id: string; data: PayloadLoanUpdate }) =>
      updateLoan(data),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-loans"] });
      queryClient.invalidateQueries({ queryKey: ["loan"] });

      setModal(false, null);
      toast.success(
        response.msg || response.status || "loans created successfully!",
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

export const useDeleteLoan = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: (id: string) => deleteLoan(id),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-loans"] });

      setModal(false, null);
      toast.success(response.msg || "loans deleted successfully!");
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

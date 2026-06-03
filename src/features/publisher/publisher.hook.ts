import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPublisherBook,
  deletePublisherBook,
  getAllPublisherBook,
  getDetailPublisherBook,
  updatePublisherBook,
} from "./publisher.service";
import { useUIStore } from "../../stores/ui.store";
import toast from "react-hot-toast";
import type { PublisherBook } from "./publisher.type";

export const usePublisherBooks = () => {
  return useQuery({
    queryKey: ["all-publisher-books"],
    queryFn: () => getAllPublisherBook(),
  });
};

export const usePublisherBook = (id: string) => {
  return useQuery({
    queryKey: ["publisher-book", id],
    queryFn: () => getDetailPublisherBook(id),
  });
};

export const useCreatePublisherBook = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: createPublisherBook,
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-publisher-books"] });

      setModal(false, null);
      toast.success(response.status || "publisher book created successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      const serverErrorMessage = error?.response?.data?.msg;
      console.log(error?.response?.data?.msg);

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

export const useUpdatePublisherBook = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: ({ data }: { id: string; data: PublisherBook }) =>
      updatePublisherBook(data),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-publisher-books"] });
      queryClient.invalidateQueries({ queryKey: ["publisher-book"] });

      setModal(false, null);
      toast.success(
        response.msg ||
          response.status ||
          "publisher book created successfully!",
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      const serverErrorMessage = error?.response?.data?.msg;
      console.log(error?.response?.data?.msg);

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

export const useDeletePublisherBook = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: (id: string) => deletePublisherBook(id),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-publisher-books"] });

      setModal(false, null);
      toast.success(response.msg || "publisher book deleted successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      const serverErrorMessage = error?.response?.data?.msg;
      console.log(error?.response?.data?.msg);

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

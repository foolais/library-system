import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAuthorBook,
  deleteAuthorBook,
  getAllAuthorBook,
  getDetailAuthorBook,
  updateAuthorBook,
} from "./author.service";
import { useUIStore } from "../../stores/ui.store";
import toast from "react-hot-toast";
import type { AuthorBook } from "./author.types";

export const useAuthorBooks = () => {
  return useQuery({
    queryKey: ["all-author-books"],
    queryFn: () => getAllAuthorBook(),
  });
};

export const useAuthorBook = (id: string) => {
  return useQuery({
    queryKey: ["author-book", id],
    queryFn: () => getDetailAuthorBook(id),
  });
};

export const useCreateAuthorBook = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: createAuthorBook,
    onSuccess(response) {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["all-author-books"] });

      setModal(false, null);
      toast.success(response.status || "Author book created successfully!");
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

export const useUpdateAuthorBook = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: ({ data }: { id: string; data: AuthorBook }) =>
      updateAuthorBook(data),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-author-books"] });
      queryClient.invalidateQueries({ queryKey: ["author-book"] });

      setModal(false, null);
      toast.success(
        response.msg || response.status || "Author book created successfully!",
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

export const useDeleteAuthorBook = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: (id: string) => deleteAuthorBook(id),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-author-books"] });

      setModal(false, null);
      toast.success(response.msg || "Author book deleted successfully!");
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

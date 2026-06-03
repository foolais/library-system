import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryBook,
  deleteCategoryBook,
  getAllCategoriesBooks,
  getDetailCategoryBook,
  updateCategoryBook,
} from "./category.service";
import { useUIStore } from "../../stores/ui.store";
import toast from "react-hot-toast";
import type { CategoryBook } from "./category.type";

export const useCategoryBooks = (search?: string) => {
  return useQuery({
    queryKey: ["all-category-books", search],
    queryFn: () => getAllCategoriesBooks(search),
  });
};

export const useCategoryBook = (id: string) => {
  return useQuery({
    queryKey: ["category-book", id],
    queryFn: () => getDetailCategoryBook(id),
  });
};

export const useCreateCategoryBook = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: createCategoryBook,
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-category-books"] });

      setModal(false, null);
      toast.success(response.msg || "Category book created successfully!");
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

export const useUpdateCategoryBook = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: ({ data }: { id: string; data: CategoryBook }) =>
      updateCategoryBook(data),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-category-books"] });
      queryClient.invalidateQueries({ queryKey: ["category-book"] });

      setModal(false, null);
      toast.success(response.msg || "Category book created successfully!");
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

export const useDeleteCategoryBook = () => {
  const queryClient = useQueryClient();
  const setModal = useUIStore((state) => state.setModal);

  return useMutation({
    mutationFn: (id: string) => deleteCategoryBook(id),
    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["all-category-books"] });

      setModal(false, null);
      toast.success(response.msg || "Category book deleted successfully!");
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

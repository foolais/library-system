import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBookById } from "./book.service";

export const useBooks = () => {
  return useQuery({
    queryKey: ["all-books"],
    queryFn: () => getAllBooks(),
  });
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
  });
};

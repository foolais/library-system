import { Info } from "lucide-react";
import { useBooks } from "../../features/book/book.hook";
import type { Book } from "../../features/book/book.types";
import { useUIStore } from "../../stores/ui.store";
import BookDetailModal from "../modal/BookDetailModal";

const TableBooks = () => {
  const { data: books, isLoading, isError } = useBooks();
  const setModal = useUIStore((state) => state.setModal);

  if (isLoading) {
    return (
      <div className="p-6 text-center font-medium text-gray-500">
        Loading books...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-6 text-center font-medium text-red-500">
        Error loading data.
      </div>
    );
  }

  const bookList = books?.data || [];

  const handleDetailClick = (id: string) => {
    setModal(true, id, "detail");
  };

  return (
    <div className="table-container">
      <div className="table-card">
        <table className="table-base">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="table-th w-[10%] text-center sm:w-[8%] md:w-[5%]"
              >
                No
              </th>
              <th
                scope="col"
                className="table-th w-[60%] text-left sm:w-[42%] md:w-[25%]"
              >
                Judul Buku
              </th>
              <th
                scope="col"
                className="table-th hidden md:table-cell md:w-[25%]"
              >
                Deskripsi Buku
              </th>
              <th
                scope="col"
                className="table-th hidden sm:table-cell sm:w-[25%] md:w-[15%]"
              >
                ISBN
              </th>
              <th
                scope="col"
                className="table-th-center hidden sm:table-cell sm:w-[12%] md:w-[8%]"
              >
                Stok
              </th>
              <th
                scope="col"
                className="table-th-center hidden md:table-cell md:w-[7%]"
              >
                Tahun
              </th>
              <th
                scope="col"
                className="table-th-center hidden md:table-cell md:w-[10%]"
              >
                Rak Buku
              </th>
              <th
                scope="col"
                className="table-th-center w-[30%] sm:w-[13%] md:w-[5%]"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {bookList.map((book: Book, index: number) => (
              <tr
                key={book.id_buku}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="table-td text-center font-mono text-gray-400">
                  {index + 1}
                </td>
                <td className="table-td text-left font-medium text-gray-900">
                  {book.judul_buku}
                </td>
                <td className="table-td-muted hidden text-left md:table-cell">
                  {book.deskripsi_buku || "-"}
                </td>
                <td className="table-td-mono hidden sm:table-cell">
                  {book.isbn}
                </td>
                <td className="table-td hidden text-center sm:table-cell">
                  <span
                    className={`badge ${book.stok_buku > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                  >
                    {book.stok_buku}
                  </span>
                </td>
                <td className="table-td-muted hidden text-center md:table-cell">
                  {book.tahun_terbit}
                </td>
                <td className="table-td-mono hidden text-center md:table-cell">
                  {book.rak_buku}
                </td>
                <td className="table-td text-center">
                  <button
                    type="button"
                    onClick={() => handleDetailClick(book.id_buku)}
                    className="bg-primary hover:bg-primary/90 mx-auto flex size-6 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105"
                    title="Lihat Detail"
                  >
                    <Info className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookList.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No books found in database.
          </div>
        )}
      </div>
      <BookDetailModal />
    </div>
  );
};

export default TableBooks;

import { Info } from "lucide-react";
import { useUIStore } from "../../stores/ui.store";
import { useAuthorBooks } from "../../features/author/author.hook";
import type {
  AuthorBook,
  AuthorBookWithAlamat,
} from "../../features/author/author.types";
import AuthorModal from "../modal/AuthorModal";

const TableAuthors = () => {
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setModal = useUIStore((state) => state.setModal);

  const {
    data: authorsResponse,
    isLoading,
    isError,
  } = useAuthorBooks(searchQuery);

  if (isLoading) {
    return (
      <div className="p-6 text-center font-medium text-gray-500">
        Loading authors...
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

  const authorList = authorsResponse?.data || [];
  const mappedAuthors = authorList.map((author: AuthorBookWithAlamat) => {
    return {
      ...author,
      alamat_penulis: author.alamat,
    };
  });

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
                className="table-th w-[12%] text-center sm:w-[8%] md:w-[5%]"
              >
                No
              </th>
              <th
                scope="col"
                className="table-th w-[68%] text-left sm:w-[47%] md:w-[25%]"
              >
                Nama Penulis
              </th>
              <th
                scope="col"
                className="table-th hidden sm:table-cell sm:w-[35%] md:w-[20%]"
              >
                Email
              </th>
              <th
                scope="col"
                className="table-th hidden md:table-cell md:w-[15%]"
              >
                Alamat
              </th>
              <th
                scope="col"
                className="table-th hidden md:table-cell md:w-[25%]"
              >
                Deskripsi
              </th>
              <th
                scope="col"
                className="table-th-center w-[20%] sm:w-[10%] md:w-[10%]"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mappedAuthors.map((author: AuthorBook, index: number) => (
              <tr
                key={author.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="table-td text-center font-mono text-gray-400">
                  {index + 1}
                </td>
                <td className="table-td text-left font-medium text-gray-900">
                  {author.penulis_buku}
                </td>
                <td className="table-td-muted hidden text-left sm:table-cell">
                  {author.email_penulis}
                </td>
                <td className="table-td-muted hidden text-left md:table-cell">
                  {author.alamat_penulis || "-"}
                </td>
                <td className="table-td-muted hidden max-w-xs truncate text-left md:table-cell">
                  {author.deskripsi || "-"}
                </td>
                <td className="table-td text-center">
                  <button
                    type="button"
                    onClick={() => handleDetailClick(author.id)}
                    className="bg-primary hover:bg-primary/90 mx-auto flex size-6 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105"
                    title="Lihat Detail Penulis"
                  >
                    <Info className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {authorList.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            Belum ada data penulis di dalam database.
          </div>
        )}
      </div>
      <AuthorModal />
    </div>
  );
};

export default TableAuthors;

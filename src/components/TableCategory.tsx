import { Info } from "lucide-react";
import { useUIStore } from "../stores/ui.store";
import { useCategoryBooks } from "../features/category/category.hook";
import CategoryModal from "./CategoryModal";
import type { CategoryBook } from "../features/category/category.type";

const TableCategory = () => {
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setModal = useUIStore((state) => state.setModal);

  const {
    data: categoriesResponse,
    isLoading,
    isError,
  } = useCategoryBooks(searchQuery);

  if (isLoading) {
    return (
      <div className="p-6 text-center font-medium text-gray-500">
        Loading categories...
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

  const categoryList = categoriesResponse?.data || [];

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
                className="table-th w-[15%] text-center sm:w-[10%] md:w-[8%]"
              >
                No
              </th>
              <th
                scope="col"
                className="table-th w-[65%] text-left sm:w-[50%] md:w-[32%]"
              >
                Jenis Buku
              </th>
              <th
                scope="col"
                className="table-th hidden sm:table-cell sm:w-[30%] md:w-[50%]"
              >
                Deskripsi Kategori
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
            {categoryList.map((category: CategoryBook, index: number) => (
              <tr
                key={category.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="table-td text-center font-mono text-gray-400">
                  {index + 1}
                </td>
                <td className="table-td text-left font-medium text-gray-900">
                  {category.jenis_buku}
                </td>
                <td className="table-td-muted hidden text-left sm:table-cell">
                  {category.deskripsi || "-"}
                </td>
                <td className="table-td text-center">
                  <button
                    type="button"
                    onClick={() => handleDetailClick(category.id)}
                    className="bg-primary hover:bg-primary/90 mx-auto flex size-6 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105"
                    title="Lihat Detail Kategori"
                  >
                    <Info className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categoryList.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No categories found in database.
          </div>
        )}
      </div>
      <CategoryModal />
    </div>
  );
};

export default TableCategory;

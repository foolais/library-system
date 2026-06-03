import { Info } from "lucide-react";
import { useUIStore } from "../stores/ui.store";
import { usePublisherBooks } from "../features/publisher/publisher.hook";
import type { PublisherBook } from "../features/publisher/publisher.type";
import PublisherModal from "./modal/PublisherModal";

const TablePublishers = () => {
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setModal = useUIStore((state) => state.setModal);

  const {
    data: publishersResponse,
    isLoading,
    isError,
  } = usePublisherBooks(searchQuery);

  if (isLoading) {
    return (
      <div className="p-6 text-center font-medium text-gray-500">
        Loading publishers...
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

  const publisherList = publishersResponse?.data || [];

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
                className="table-th w-[68%] text-left sm:w-[47%] md:w-[30%]"
              >
                Nama Penerbit
              </th>
              <th
                scope="col"
                className="table-th hidden sm:table-cell sm:w-[35%] md:w-[25%]"
              >
                Email
              </th>
              <th
                scope="col"
                className="table-th hidden md:table-cell md:w-[15%]"
              >
                No. Telepon
              </th>
              <th
                scope="col"
                className="table-th hidden md:table-cell md:w-[15%]"
              >
                Kota Alamat
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
            {publisherList.map((publisher: PublisherBook, index: number) => (
              <tr
                key={publisher.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="table-td text-center font-mono text-gray-400">
                  {index + 1}
                </td>
                <td className="table-td text-left font-medium text-gray-900">
                  {publisher.penerbit_buku}
                </td>
                <td className="table-td-muted hidden text-left sm:table-cell">
                  {publisher.email_penerbit}
                </td>
                <td className="table-td-muted hidden text-left font-mono text-xs md:table-cell">
                  {publisher.telp_penerbit || "-"}
                </td>
                <td className="table-td-muted hidden text-left md:table-cell">
                  {publisher.alamat_penerbit}
                </td>
                <td className="table-td text-center">
                  <button
                    type="button"
                    onClick={() => handleDetailClick(publisher.id)}
                    className="bg-primary hover:bg-primary/90 mx-auto flex size-6 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105"
                    title="Lihat Detail Penerbit"
                  >
                    <Info className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {publisherList.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            Belum ada data penerbit di dalam database.
          </div>
        )}
      </div>
      <PublisherModal />
    </div>
  );
};

export default TablePublishers;

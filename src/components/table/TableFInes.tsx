import { Info } from "lucide-react";
import { useUIStore } from "../../stores/ui.store";
import { useFines } from "../../features/fines/fines.hook";
import { formatCurrency, formatDate } from "../../lib/utils";
import type { IFines } from "../../features/fines/fines.type";

const TableFines = () => {
  const { data: finesResponse, isLoading, isError } = useFines();
  const setModal = useUIStore((state) => state.setModal);

  if (isLoading) {
    return (
      <div className="p-6 text-center font-medium text-gray-500">
        Memuat data denda...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-6 text-center font-medium text-red-500">
        Gagal memuat data denda.
      </div>
    );
  }

  const fineList: IFines[] = finesResponse?.data || [];

  return (
    <div className="table-container">
      <div className="table-card">
        <table className="table-base">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="table-th w-[10%] text-center sm:w-[5%]"
              >
                No
              </th>
              <th
                scope="col"
                className="table-th w-[50%] sm:w-[35%] md:w-[20%]"
              >
                ID Anggota
              </th>
              <th
                scope="col"
                className="table-th w-[25%] text-right sm:w-[25%] md:w-[15%]"
              >
                Jumlah Denda
              </th>
              <th
                scope="col"
                className="table-th hidden sm:table-cell sm:w-[20%] md:w-[15%]"
              >
                Tgl Pinjam
              </th>
              <th
                scope="col"
                className="table-th hidden md:table-cell md:w-[15%]"
              >
                Harus Kembali
              </th>
              <th
                scope="col"
                className="table-th hidden md:table-cell md:w-[15%]"
              >
                Tgl Kembali
              </th>
              <th scope="col" className="table-th-center w-[15%] sm:w-[10%]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {fineList.map((fine: IFines, index) => (
              <tr
                key={fine.id_denda}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="table-td text-center font-mono text-gray-400">
                  {index + 1}
                </td>
                <td className="table-td truncate text-left font-mono text-xs font-medium text-gray-900">
                  {fine.id_anggota}
                </td>
                <td className="table-td text-right font-semibold text-red-600">
                  {formatCurrency(+fine.jumlah_denda)}
                </td>
                <td className="table-td-muted hidden text-center sm:table-cell">
                  {formatDate(fine.tgl_pinjam)}
                </td>
                <td className="table-td-muted hidden text-center md:table-cell">
                  {formatDate(fine.tgl_hrs_kembali)}
                </td>
                <td className="table-td-muted hidden text-center text-green-600 md:table-cell">
                  {formatDate(fine.tgl_kembali)}
                </td>
                <td className="table-td text-center">
                  <button
                    type="button"
                    onClick={() => setModal(true, fine.id_denda, "detail")}
                    className="bg-primary hover:bg-primary/90 mx-auto flex size-6 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105"
                    title="Lihat Rincian Denda"
                  >
                    <Info className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {fineList.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            Tidak ada catatan denda ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};

export default TableFines;

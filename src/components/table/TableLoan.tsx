import { Info } from "lucide-react";
import { useLoans } from "../../features/loans/loan.hook";
import { useUIStore } from "../../stores/ui.store";
import type { ILoan } from "../../features/loans/loan.type";

const TableLoan = () => {
  const { data: loansResponse, isLoading, isError } = useLoans();

  const setModal = useUIStore((state) => state.setModal);

  if (isLoading) {
    return (
      <div className="p-6 text-center font-medium text-gray-500">
        Loading loans...
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

  const loansList = loansResponse?.data || [];

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
                className="table-th w-[68%] text-left sm:w-[47%] md:w-[35%]"
              >
                ID Anggota
              </th>
              <th
                scope="col"
                className="table-th hidden text-center sm:table-cell sm:w-[35%] md:w-[25%]"
              >
                Tgl Pinjam
              </th>
              <th
                scope="col"
                className="table-th hidden text-center md:table-cell md:w-[25%]"
              >
                Batas Kembali
              </th>
              <th scope="col" className="table-th-center w-[20%] sm:w-[10%]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loansList.map((item: ILoan, index: number) => (
              <tr key={item.id} className="transition-colors hover:bg-gray-50">
                <td className="table-td text-center font-mono text-gray-400">
                  {index + 1}
                </td>
                <td className="table-td truncate text-left font-mono text-xs font-medium text-gray-900">
                  {item.id_anggota}
                </td>
                <td className="table-td-muted hidden text-center sm:table-cell">
                  {new Date(item.tgl_pinjam).toLocaleDateString("id-ID")}
                </td>
                <td className="table-td hidden text-center font-medium text-red-600 md:table-cell">
                  {new Date(item.tgl_hrs_kembali).toLocaleDateString("id-ID")}
                </td>
                <td className="table-td text-center">
                  <button
                    type="button"
                    onClick={() => setModal(true, item.id, "detail")}
                    className="bg-primary hover:bg-primary/90 mx-auto flex size-6 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105"
                    title="Lihat Rincian Peminjaman"
                  >
                    <Info className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loansList.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            Belum ada transaksi peminjaman.
          </div>
        )}
      </div>
    </div>
  );
};

export default TableLoan;

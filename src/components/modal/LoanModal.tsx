import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Edit, Trash, BookOpen } from "lucide-react";
import { useUIStore } from "../../stores/ui.store";
import {
  useCreateLoan,
  useDeleteLoan,
  useLoan,
  useLoanInnerDetail,
  useUpdateLoan,
} from "../../features/loans/loan.hook";
import {
  loanSchema,
  type LoanFormData,
} from "../../features/loans/loan.schema";
import Modal from "../Modal";
import type { LoanDetailInnerItem } from "../../features/loans/loan.type";

const LoanModal = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const modalId = useUIStore((state) => state.modalId);
  const modalMode = useUIStore((state) => state.modalMode);
  const setModal = useUIStore((state) => state.setModal);

  const isCreateMode = modalMode === "create";
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: detailResponse,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useLoanInnerDetail(
    modalId || "",
    !!modalId && !isCreateMode && !isEditing,
  );
  const loanDetail = detailResponse?.data;

  const {
    data: basicResponse,
    isLoading: isLoadingBasic,
    isError: isErrorBasic,
  } = useLoan(!isCreateMode && isEditing && modalId ? modalId : "");
  const loanBasic = basicResponse?.data;

  const createMutation = useCreateLoan();
  const updateMutation = useUpdateLoan();
  const deleteMutation = useDeleteLoan();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
  });

  const formatToInputDate = (isoString: string) =>
    isoString ? isoString.substring(0, 10) : "";

  useEffect(() => {
    if (isCreateMode) {
      reset({
        id_anggota: "",
        tgl_pinjam: "",
        tgl_hrs_kembali: "",
        jaminan: "",
      });
    } else if (isEditing && loanBasic) {
      reset({
        id_anggota: loanBasic.id_anggota || "",
        tgl_pinjam: formatToInputDate(loanBasic.tgl_pinjam),
        tgl_hrs_kembali: formatToInputDate(loanBasic.tgl_hrs_kembali),
        jaminan: loanBasic.jaminan || "",
      });
    }
  }, [loanBasic, isCreateMode, isEditing, reset]);

  const handleCloseModal = () => {
    setModal(false, null);
    setIsEditing(false);
    reset();
  };

  const onSubmit = (data: LoanFormData) => {
    const payload = {
      ...data,
      tgl_pinjam: new Date(data.tgl_pinjam).toISOString(),
      tgl_hrs_kembali: new Date(data.tgl_hrs_kembali).toISOString(),
    };

    if (isCreateMode) {
      createMutation.mutate(payload, { onSuccess: handleCloseModal });
    } else if (modalId) {
      updateMutation.mutate(
        { id: modalId, data: { ...payload, id_peminjaman: modalId } },
        { onSuccess: handleCloseModal },
      );
    }
  };

  const handleDelete = () => {
    if (!modalId) return;
    deleteMutation.mutate(modalId, { onSuccess: handleCloseModal });
  };

  const getModalTitle = () => {
    if (isCreateMode) return "Tambah Peminjaman Baru";
    if (isEditing) return "Ubah Catatan Peminjaman";
    return "Detail Rincian Peminjaman";
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      dateStyle: "medium",
    });
  };

  const showFormLayout = isCreateMode || isEditing;
  const isLoading = isEditing ? isLoadingBasic : isLoadingDetail;
  const isError = isEditing ? isErrorBasic : isErrorDetail;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={getModalTitle()}
    >
      {!isCreateMode && isLoading && (
        <div className="p-8 text-center text-sm font-medium text-gray-500">
          Memuat data transaksi...
        </div>
      )}
      {!isCreateMode && isError && (
        <div className="p-8 text-center text-sm font-medium text-red-500">
          Gagal memproses data server.
        </div>
      )}

      {(isCreateMode ||
        (!isLoading && !isError && (showFormLayout ? true : loanDetail))) && (
        <div className="flex flex-col items-center justify-center text-center">
          {showFormLayout ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4 px-2"
            >
              <div className="flex flex-col text-left">
                <label htmlFor="id_anggota" className="label-input">
                  ID ANGGOTA
                </label>
                <input
                  id="id_anggota"
                  placeholder="Masukkan ID Anggota"
                  {...register("id_anggota")}
                  className="btn-input font-mono text-sm"
                />
                {errors.id_anggota && (
                  <p className="error-input-message text-center">
                    {errors.id_anggota.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col text-left">
                  <label htmlFor="tgl_pinjam" className="label-input">
                    TANGGAL PINJAM
                  </label>
                  <input
                    id="tgl_pinjam"
                    type="date"
                    {...register("tgl_pinjam")}
                    className="btn-input"
                  />
                  {errors.tgl_pinjam && (
                    <p className="error-input-message text-center">
                      {errors.tgl_pinjam.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <label htmlFor="tgl_hrs_kembali" className="label-input">
                    BATAS KEMBALI
                  </label>
                  <input
                    id="tgl_hrs_kembali"
                    type="date"
                    {...register("tgl_hrs_kembali")}
                    className="btn-input"
                  />
                  {errors.tgl_hrs_kembali && (
                    <p className="error-input-message text-center">
                      {errors.tgl_hrs_kembali.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="jaminan" className="label-input">
                  DOKUMEN JAMINAN
                </label>
                <input
                  id="jaminan"
                  placeholder="Contoh: KTP / SIM"
                  {...register("jaminan")}
                  className="btn-input"
                />
                {errors.jaminan && (
                  <p className="error-input-message text-center">
                    {errors.jaminan.message}
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={
                    isCreateMode ? handleCloseModal : () => setIsEditing(false)
                  }
                  className="btn-ghost flex w-full items-center justify-center px-4 py-2 sm:max-w-30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="btn-primary flex w-full items-center justify-center px-4 py-2 disabled:opacity-50 sm:max-w-35"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            loanDetail && (
              <div className="w-full space-y-5 text-left">
                <div className="detail-banner flex w-full flex-col items-center justify-center text-center">
                  <div className="space-y-1">
                    <span className="detail-label-xs">Nama Anggota</span>
                    <h4 className="detail-title">{loanDetail.anggota?.nama}</h4>
                    <p className="detail-text-id">
                      ID Anggota: {loanDetail.anggota?.id_anggota}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm">
                  <div>
                    <span className="block text-xs font-bold tracking-wider text-gray-400">
                      TGL PINJAM
                    </span>
                    <span className="font-semibold text-gray-800">
                      {formatDisplayDate(loanDetail.tgl_pinjam)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold tracking-wider text-gray-400">
                      DEADLINE KEMBALI
                    </span>
                    <span className="font-bold text-red-600">
                      {formatDisplayDate(loanDetail.tgl_hrs_kembali)}
                    </span>
                  </div>
                  <div className="col-span-2 border-t border-gray-200/60 pt-2">
                    <span className="block text-xs font-bold tracking-wider text-gray-400">
                      JAMINAN
                    </span>
                    <span className="badge mt-1 border border-blue-100 bg-blue-50 font-semibold text-blue-700">
                      {loanDetail.jaminan}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-400 uppercase">
                    <BookOpen className="size-3.5" /> Buku Yang Dipinjam
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-xs">
                      <thead className="bg-gray-50 font-semibold text-gray-500 uppercase">
                        <tr>
                          <th className="px-3 py-2 text-left">
                            ID / Judul Buku
                          </th>
                          <th className="w-[25%] px-3 py-2 text-center">
                            Kondisi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {loanDetail.details?.map(
                          (item: LoanDetailInnerItem) => (
                            <tr
                              key={item.id_detailpinjam}
                              className="hover:bg-gray-50/50"
                            >
                              <td className="max-w-50 truncate px-3 py-2 font-mono font-medium text-gray-900">
                                {item.id_buku}
                              </td>
                              <td className="px-3 py-2 text-center">
                                <span className="rounded-full border border-green-100 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                                  {item.kondisi}
                                </span>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="btn-destructive flex w-full items-center justify-center px-4 py-2 disabled:opacity-50 sm:max-w-30"
                  >
                    <Trash className="mr-1 size-4" /> Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex w-full items-center justify-center px-4 py-2 sm:max-w-30"
                  >
                    <Edit className="mr-1 size-4" /> Edit
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </Modal>
  );
};

export default LoanModal;

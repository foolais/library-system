import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUIStore } from "../../stores/ui.store";
import Modal from "../Modal";
import { Edit, Trash, AlertTriangle } from "lucide-react";
import {
  useCreateFine,
  useDeleteFine,
  useFine,
  useUpdateFine,
} from "../../features/fines/fines.hook";
import {
  finesSchema,
  type FinesFormData,
} from "../../features/fines/fines.schema";

const FineModal = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const modalId = useUIStore((state) => state.modalId);
  const modalMode = useUIStore((state) => state.modalMode);
  const setModal = useUIStore((state) => state.setModal);

  const isCreateMode = modalMode === "create";
  const [isEditing, setIsEditing] = useState(false);

  const { data: fineResponse, isLoading, isError } = useFine(modalId || "");
  const fine = fineResponse?.data || fineResponse;

  const createMutation = useCreateFine();
  const updateMutation = useUpdateFine();
  const deleteMutation = useDeleteFine();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FinesFormData>({
    resolver: zodResolver(finesSchema),
  });

  const formatToInputDate = (isoString: string) =>
    isoString ? isoString.substring(0, 10) : "";

  useEffect(() => {
    if (isCreateMode) {
      reset({
        id_anggota: "",
        id_peminjaman: "",
        jumlah_denda: "0",
        tgl_pinjam: "",
        tgl_hrs_kembali: "",
        tgl_kembali: "",
      });
    } else if (fine) {
      reset({
        id_anggota: fine.id_anggota || "",
        id_peminjaman: fine.id_peminjaman || "",
        jumlah_denda: fine.jumlah_denda || 0,
        tgl_pinjam: formatToInputDate(fine.tgl_pinjam),
        tgl_hrs_kembali: formatToInputDate(fine.tgl_hrs_kembali),
        tgl_kembali: formatToInputDate(fine.tgl_kembali),
      });
    }
  }, [fine, isCreateMode, reset]);

  const handleCloseModal = () => {
    setModal(false, null);
    setIsEditing(false);
    reset();
  };

  const onSubmit = (data: FinesFormData) => {
    const payload = {
      ...data,
      tgl_pinjam: new Date(data.tgl_pinjam).toISOString(),
      tgl_hrs_kembali: new Date(data.tgl_hrs_kembali).toISOString(),
      tgl_kembali: new Date(data.tgl_kembali).toISOString(),
    };

    if (isCreateMode) {
      createMutation.mutate(payload, { onSuccess: handleCloseModal });
    } else if (modalId) {
      updateMutation.mutate(
        {
          id: modalId,
          data: { ...payload, id_denda: modalId },
        },
        { onSuccess: handleCloseModal },
      );
    }
  };

  const handleDelete = () => {
    if (!modalId) return;
    deleteMutation.mutate(modalId, { onSuccess: handleCloseModal });
  };

  const getModalTitle = () => {
    if (isCreateMode) return "Tambah Catatan Denda";
    if (isEditing) return "Ubah Data Pembebanan Denda";
    return "Detail Rincian Denda Anggota";
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      dateStyle: "medium",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const showFormLayout = isCreateMode || isEditing;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={getModalTitle()}
    >
      {!isCreateMode && isLoading && (
        <div className="p-8 text-center text-sm font-medium text-gray-500">
          Memuat rincian denda...
        </div>
      )}
      {!isCreateMode && isError && (
        <div className="p-8 text-center text-sm font-medium text-red-500">
          Gagal mengambil data denda.
        </div>
      )}
      {(isCreateMode || (!isLoading && !isError && fine)) && (
        <div className="flex flex-col items-center justify-center text-center">
          {showFormLayout ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4 px-2"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col text-left">
                  <label htmlFor="id_anggota" className="label-input">
                    Id Anggota
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
                <div className="flex flex-col text-left">
                  <label htmlFor="id_peminjaman" className="label-input">
                    Id Peminjaman
                  </label>
                  <input
                    id="id_peminjaman"
                    placeholder="ID Transaksi Pinjam"
                    {...register("id_peminjaman")}
                    className="btn-input font-mono text-sm"
                  />
                  {errors.id_peminjaman && (
                    <p className="error-input-message text-center">
                      {errors.id_peminjaman.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="jumlah_denda" className="label-input">
                  Jumlah Denda
                </label>
                <input
                  id="jumlah_denda"
                  type="number"
                  placeholder="Contoh: 5000"
                  {...register("jumlah_denda")}
                  className="btn-input font-semibold"
                />
                {errors.jumlah_denda && (
                  <p className="error-input-message text-center">
                    {errors.jumlah_denda.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col text-left">
                  <label htmlFor="tgl_pinjam" className="label-input">
                    Tanggal Pinjam
                  </label>
                  <input
                    id="tgl_pinjam"
                    type="date"
                    {...register("tgl_pinjam")}
                    className="btn-input text-xs"
                  />
                  {errors.tgl_pinjam && (
                    <p className="error-input-message text-center">
                      {errors.tgl_pinjam.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <label htmlFor="tgl_hrs_kembali" className="label-input">
                    Tanggal Kembali
                  </label>
                  <input
                    id="tgl_hrs_kembali"
                    type="date"
                    {...register("tgl_hrs_kembali")}
                    className="btn-input text-xs"
                  />
                  {errors.tgl_hrs_kembali && (
                    <p className="error-input-message text-center">
                      {errors.tgl_hrs_kembali.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <label htmlFor="tgl_kembali" className="label-input">
                    Realisasi Kembali
                  </label>
                  <input
                    id="tgl_kembali"
                    type="date"
                    {...register("tgl_kembali")}
                    className="btn-input text-xs"
                  />
                  {errors.tgl_kembali && (
                    <p className="error-input-message text-center">
                      {errors.tgl_kembali.message}
                    </p>
                  )}
                </div>
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
            <div className="w-full space-y-5 text-left">
              <div className="flex w-full flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 p-4 text-center">
                <AlertTriangle className="mb-1 size-6 text-red-500" />
                <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase">
                  Total Pembebanan Denda
                </span>
                <h4 className="mt-0.5 text-xl font-black text-red-600">
                  {formatCurrency(fine.jumlah_denda)}
                </h4>
                <p className="mt-1 font-mono text-[10px] text-gray-400">
                  ID Denda: {fine.id_denda}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3 font-mono text-xs">
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    ID Anggota
                  </span>
                  <span className="font-medium text-gray-800">
                    {fine.id_anggota}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    ID Peminjaman
                  </span>
                  <span className="font-medium text-gray-800">
                    {fine.id_peminjaman}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-100 bg-white p-3 text-xs sm:grid-cols-3">
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Tgl Pinjam
                  </span>
                  <span className="font-medium text-gray-700">
                    {formatDisplayDate(fine.tgl_pinjam)}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Batas Kembali
                  </span>
                  <span className="font-medium text-gray-700">
                    {formatDisplayDate(fine.tgl_hrs_kembali)}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Tgl Realisasi Kembali
                  </span>
                  <span className="font-bold text-green-600">
                    {formatDisplayDate(fine.tgl_kembali)}
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="btn-destructive flex w-full items-center justify-center px-4 py-2 disabled:opacity-50 sm:max-w-30"
                >
                  <Trash className="mr-1 size-4" />{" "}
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
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
          )}
        </div>
      )}
    </Modal>
  );
};

export default FineModal;

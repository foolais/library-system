import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash } from "lucide-react";
import { useUIStore } from "../../stores/ui.store";
import {
  useCreatePublisherBook,
  useDeletePublisherBook,
  usePublisherBook,
  useUpdatePublisherBook,
} from "../../features/publisher/publisher.hook";
import {
  publisherBookSchema,
  type PublisherFormData,
} from "../../features/publisher/publisher.schema";
import Modal from "../Modal";

const PublisherModal = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const modalId = useUIStore((state) => state.modalId);
  const modalMode = useUIStore((state) => state.modalMode);
  const setModal = useUIStore((state) => state.setModal);

  const isCreateMode = modalMode === "create";
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: publisherResponse,
    isLoading,
    isError,
  } = usePublisherBook(!isCreateMode && modalId ? modalId : "");
  const publisher = publisherResponse?.data || publisherResponse;

  const createMutation = useCreatePublisherBook();
  const updateMutation = useUpdatePublisherBook();
  const deleteMutation = useDeletePublisherBook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PublisherFormData>({
    resolver: zodResolver(publisherBookSchema),
  });

  useEffect(() => {
    if (isCreateMode) {
      reset({
        penerbit_buku: "",
        alamat_penerbit: "",
        telp_penerbit: "",
        email_penerbit: "",
        deskripsi_penerbit: "",
      });
    } else if (publisher) {
      reset({
        penerbit_buku: publisher.penerbit_buku || "",
        alamat_penerbit: publisher.alamat_penerbit || "",
        telp_penerbit: publisher.telp_penerbit || "",
        email_penerbit: publisher.email_penerbit || "",
        deskripsi_penerbit:
          publisher.deskripsi_penerbit || publisher.deskripsi || "",
      });
    }
  }, [publisher, isCreateMode, reset]);

  const handleCloseModal = () => {
    setModal(false, null);
    setIsEditing(false);
    reset();
  };

  const onSubmit = (data: PublisherFormData) => {
    const payload = { ...data, deskripsi: data.deskripsi_penerbit };

    if (isCreateMode) {
      createMutation.mutate(payload, { onSuccess: handleCloseModal });
    } else if (modalId) {
      updateMutation.mutate(
        { id: modalId, data: { ...payload, id: modalId } },
        { onSuccess: handleCloseModal },
      );
    }
  };

  const handleDelete = () => {
    if (!modalId) return;
    deleteMutation.mutate(modalId, { onSuccess: handleCloseModal });
  };

  const getModalTitle = () => {
    if (isCreateMode) return "Tambah Penerbit Baru";
    if (isEditing) return "Ubah Informasi Penerbit";
    return "Detail Informasi Penerbit";
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
          Memuat data...
        </div>
      )}
      {!isCreateMode && isError && (
        <div className="p-8 text-center text-sm font-medium text-red-500">
          Gagal mengambil data.
        </div>
      )}

      {(isCreateMode || (!isLoading && !isError && publisher)) && (
        <div className="flex flex-col items-center justify-center text-center">
          {showFormLayout ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4 px-2"
            >
              <div className="flex flex-col text-left">
                <label htmlFor="penerbit_buku" className="label-input">
                  Nama Penerbit
                </label>
                <input
                  id="penerbit_buku"
                  placeholder="Masukkan nama perusahaan penerbit"
                  {...register("penerbit_buku")}
                  className="btn-input"
                />
                {errors.penerbit_buku && (
                  <p className="error-input-message text-center">
                    {errors.penerbit_buku.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="email_penerbit" className="label-input">
                  Email Penerbit
                </label>
                <input
                  id="email_penerbit"
                  type="email"
                  placeholder="publisher@domain.com"
                  {...register("email_penerbit")}
                  className="btn-input"
                />
                {errors.email_penerbit && (
                  <p className="error-input-message text-center">
                    {errors.email_penerbit.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="telp_penerbit" className="label-input">
                  No Telepon
                </label>
                <input
                  id="telp_penerbit"
                  placeholder="Contoh: 021XXXXXXXX"
                  {...register("telp_penerbit")}
                  className="btn-input"
                />
                {errors.telp_penerbit && (
                  <p className="error-input-message text-center">
                    {errors.telp_penerbit.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="alamat_penerbit" className="label-input">
                  Alamat Kota
                </label>
                <input
                  id="alamat_penerbit"
                  placeholder="Masukkan kota asal penerbit"
                  {...register("alamat_penerbit")}
                  className="btn-input"
                />
                {errors.alamat_penerbit && (
                  <p className="error-input-message text-center">
                    {errors.alamat_penerbit.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="deskripsi_penerbit" className="label-input">
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi_penerbit"
                  rows={4}
                  placeholder="Masukkan informasi deskripsi tambahan..."
                  {...register("deskripsi_penerbit")}
                  className="btn-input resize-none"
                />
                {errors.deskripsi_penerbit && (
                  <p className="error-input-message text-center">
                    {errors.deskripsi_penerbit.message}
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
                  className="btn-primary flex w-full items-center justify-center px-4 py-2 sm:max-w-35"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="w-full space-y-5">
              <div className="detail-banner flex w-full flex-col items-center justify-center">
                <div className="space-y-1">
                  <span className="detail-label-xs">Nama Penerbit</span>
                  <h4 className="detail-title">{publisher.penerbit_buku}</h4>
                  <p className="detail-text-id mt-4">
                    ID Penerbit: {publisher.id}
                  </p>
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                  <span className="detail-label">Email</span>
                  <p className="mt-0.5 inline-block max-w-full truncate rounded border border-gray-100 bg-gray-50 px-2 py-1 font-mono text-xs text-gray-900">
                    {publisher.email_penerbit}
                  </p>
                </div>
                <div>
                  <span className="detail-label">No. Telepon</span>
                  <p className="mt-0.5 font-mono text-sm font-medium text-gray-900">
                    {publisher.telp_penerbit || "-"}
                  </p>
                </div>
                <div>
                  <span className="detail-label">Kota Asal</span>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">
                    {publisher.alamat_penerbit}
                  </p>
                </div>
              </div>
              <div className="detail-section flex w-full flex-col items-center justify-center">
                <span className="detail-label">Keterangan / Deskripsi</span>
                <p className="detail-box-scrollable mx-auto w-full text-center">
                  {publisher.deskripsi_penerbit || "-"}
                </p>
              </div>
              <div className="flex w-full flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="btn-destructive flex w-full items-center justify-center px-4 py-2 sm:max-w-30"
                >
                  <Trash className="mr-1 size-4" />
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex w-full items-center justify-center px-4 py-2 sm:max-w-30"
                >
                  <Edit className="mr-1 size-4" />
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default PublisherModal;

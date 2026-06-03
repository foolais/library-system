import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUIStore } from "../../stores/ui.store";
import {
  useAuthorBook,
  useCreateAuthorBook,
  useUpdateAuthorBook,
  useDeleteAuthorBook,
} from "../../features/author/author.hook";
import {
  authorBookSchema,
  type AuthorFormData,
} from "../../features/author/author.schema";
import Modal from "../Modal";
import { Edit, Trash } from "lucide-react";

const AuthorModal = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const modalId = useUIStore((state) => state.modalId);
  const modalMode = useUIStore((state) => state.modalMode);
  const setModal = useUIStore((state) => state.setModal);

  const isCreateMode = modalMode === "create";
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: authorResponse,
    isLoading,
    isError,
  } = useAuthorBook(!isCreateMode && modalId ? modalId : "");
  const author = authorResponse?.data || authorResponse;

  const createMutation = useCreateAuthorBook();
  const updateMutation = useUpdateAuthorBook();
  const deleteMutation = useDeleteAuthorBook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorBookSchema),
  });

  useEffect(() => {
    if (isCreateMode) {
      reset({
        penulis_buku: "",
        alamat_penulis: "",
        email_penulis: "",
        deskripsi: "",
      });
    } else if (author) {
      reset({
        penulis_buku: author.penulis_buku || "",
        alamat_penulis: author.alamat_penulis || author.alamat || "",
        email_penulis: author.email_penulis || "",
        deskripsi: author.deskripsi || "",
      });
    }
  }, [author, isCreateMode, reset]);

  const handleCloseModal = () => {
    setModal(false, null);
    setIsEditing(false);
    reset();
  };

  const onSubmit = (data: AuthorFormData) => {
    if (isCreateMode) {
      createMutation.mutate(data, { onSuccess: handleCloseModal });
    } else if (modalId) {
      updateMutation.mutate(
        { id: modalId, data: { ...data, id: modalId } },
        { onSuccess: handleCloseModal },
      );
    }
  };

  const handleDelete = () => {
    if (!modalId) return;
    deleteMutation.mutate(modalId, { onSuccess: handleCloseModal });
  };

  const getModalTitle = () => {
    if (isCreateMode) return "Tambah Penulis Baru";
    if (isEditing) return "Ubah Informasi Penulis";
    return "Detail Informasi Penulis";
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
      {(isCreateMode || (!isLoading && !isError && author)) && (
        <div className="flex flex-col items-center justify-center text-center">
          {showFormLayout ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4 px-2"
            >
              <div className="flex flex-col text-left">
                <label htmlFor="penulis_buku" className="label-input">
                  Nama Penulis
                </label>
                <input
                  id="penulis_buku"
                  placeholder="Masukkan nama penulis"
                  {...register("penulis_buku")}
                  className="btn-input"
                />
                {errors.penulis_buku && (
                  <p className="error-input-message text-center">
                    {errors.penulis_buku.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="email_penulis" className="label-input">
                  Email Penulis
                </label>
                <input
                  id="email_penulis"
                  type="email"
                  placeholder="contoh@domain.com"
                  {...register("email_penulis")}
                  className="btn-input"
                />
                {errors.email_penulis && (
                  <p className="error-input-message text-center">
                    {errors.email_penulis.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="alamat" className="label-input">
                  Alamat Penulis
                </label>
                <input
                  id="alamat"
                  placeholder="Masukkan kota domisili"
                  {...register("alamat_penulis")}
                  className="btn-input"
                />
                {errors.alamat_penulis && (
                  <p className="error-input-message text-center">
                    {errors.alamat_penulis.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="deskripsi" className="label-input">
                  Deskripsi Penuli
                </label>
                <textarea
                  id="deskripsi"
                  rows={4}
                  placeholder="Masukkan deskripsi penjelas riwayat penulis..."
                  {...register("deskripsi")}
                  className="btn-input resize-none"
                />
                {errors.deskripsi && (
                  <p className="error-input-message text-center">
                    {errors.deskripsi.message}
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
                  <span className="detail-label-xs">Nama Penulis</span>
                  <h4 className="detail-title">{author.penulis_buku}</h4>
                  <p className="detail-text-id">ID Penulis: {author.id}</p>
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-4 text-center sm:grid-cols-2">
                <div>
                  <span className="detail-label">Email Penulis</span>
                  <p className="mt-0.5 inline-block rounded border border-gray-100 bg-gray-50 px-2 py-1 font-mono text-sm text-gray-900">
                    {author.email_penulis || "-"}
                  </p>
                </div>
                <div>
                  <span className="detail-label">Kota Domisili</span>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">
                    {author.alamat_penulis || author.alamat || "-"}
                  </p>
                </div>
              </div>
              <div className="detail-section flex w-full flex-col items-center justify-center">
                <span className="detail-label">
                  Biografi / Deskripsi Penulis
                </span>
                <p className="detail-box-scrollable mx-auto w-full text-center">
                  {author.deskripsi || "-"}
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

export default AuthorModal;

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUIStore } from "../../stores/ui.store";
import {
  useCategoryBook,
  useCreateCategoryBook,
  useUpdateCategoryBook,
  useDeleteCategoryBook,
} from "../../features/category/category.hook";
import {
  categoryBookSchema,
  type CategoryFormData,
} from "../../features/category/category.schema";
import Modal from "../Modal";
import { Edit, Trash } from "lucide-react";

const CategoryModal = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const modalId = useUIStore((state) => state.modalId);
  const modalMode = useUIStore((state) => state.modalMode);
  const setModal = useUIStore((state) => state.setModal);

  const isCreateMode = modalMode === "create";
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: categoryResponse,
    isLoading,
    isError,
  } = useCategoryBook(!isCreateMode && modalId ? modalId : "");
  const category = categoryResponse?.data || categoryResponse;

  const createMutation = useCreateCategoryBook();
  const updateMutation = useUpdateCategoryBook();
  const deleteMutation = useDeleteCategoryBook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryBookSchema),
  });

  useEffect(() => {
    if (isCreateMode) {
      reset({ jenis_buku: "", deskripsi: "" });
    } else if (category) {
      reset({
        jenis_buku: category.jenis_buku || "",
        deskripsi: category.deskripsi || "",
      });
    }
  }, [category, isCreateMode, reset]);

  const handleCloseModal = () => {
    setModal(false, null);
    setIsEditing(false);
    reset();
  };

  const onSubmit = (data: CategoryFormData) => {
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
    if (isCreateMode) return "Tambah jenis buku Baru";
    if (isEditing) return "Ubah jenis buku Buku";
    return "Detail jenis buku Buku";
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
      {(isCreateMode || (!isLoading && !isError && category)) && (
        <div className="flex flex-col items-center justify-center text-center">
          {showFormLayout ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4 px-2"
            >
              <div className="flex flex-col text-left">
                <label htmlFor="jenis_buku" className="label-input">
                  Jenis BUKU
                </label>
                <input
                  id="jenis_buku"
                  placeholder="Masukkan jenis buku"
                  {...register("jenis_buku")}
                  className="btn-input"
                />
                {errors.jenis_buku && (
                  <p className="error-input-message text-center">
                    {errors.jenis_buku.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="deskripsi" className="label-input">
                  Deskripsi jenis buku
                </label>
                <textarea
                  id="deskripsi"
                  rows={4}
                  placeholder="Masukkan deskripsi penjelasan jenis buku..."
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
                  <span className="detail-label-xs">Jenis Buku</span>
                  <h4 className="detail-title">{category.jenis_buku}</h4>
                  <p className="detail-text-id">ID jenis buku: {category.id}</p>
                </div>
              </div>

              <div className="detail-section flex w-full flex-col items-center justify-center">
                <span className="detail-label">
                  Deskripsi Lengkap jenis buku
                </span>
                <p className="detail-box-scrollable mx-auto w-full text-center">
                  {category.deskripsi ||
                    "Tidak ada deskripsi deskriptif penunjang untuk jenis buku ini."}
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

export default CategoryModal;

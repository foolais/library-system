import { useUIStore } from "../../stores/ui.store";
import { useBook } from "../../features/book/book.hook";
import Modal from "../Modal";
import { BookOpenText } from "lucide-react";

const BookDetailModal = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const modalId = useUIStore((state) => state.modalId);
  const setModal = useUIStore((state) => state.setModal);

  const { data: bookResponse, isLoading, isError } = useBook(modalId || "");
  const book = bookResponse?.data || bookResponse;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setModal(false, null)}
      title="Detail Informasi Lengkap Buku"
    >
      {isLoading ? (
        <div className="p-8 text-center text-sm font-medium text-gray-500">
          Memuat data detail buku...
        </div>
      ) : isError ? (
        <div className="p-8 text-center text-sm font-medium text-red-500">
          Gagal mengambil data detail buku.
        </div>
      ) : book ? (
        <div className="detail-stack">
          <div className="detail-banner">
            <div className="detail-thumb-wrapper">
              {book.gambar_buku ? (
                <img
                  src={book.gambar_buku}
                  alt={book.judul_buku}
                  className="detail-thumb-img"
                />
              ) : (
                <BookOpenText className="size-8" />
              )}
            </div>
            <div>
              <span className="detail-label-xs">Judul Buku</span>
              <h4 className="detail-title mb-4">{book.judul_buku}</h4>
              <p className="detail-text-id">ID: {book.id_buku}</p>
            </div>
          </div>
          <div className="detail-grid">
            <div>
              <span className="detail-label">ISBN</span>
              <p className="detail-badge-mono">{book.isbn}</p>
            </div>
            <div>
              <span className="detail-label">Kategori</span>
              <p className="detail-text">{book.id_kategori_buku}</p>
            </div>
            <div>
              <span className="detail-label">Penulis</span>
              <p className="detail-text">{book.id_penulis_buku}</p>
            </div>
            <div>
              <span className="detail-label">Penerbit</span>
              <p className="detail-text">{book.id_penerbit_buku}</p>
            </div>
            <div>
              <span className="detail-label">Tahun Terbit</span>
              <p className="detail-text">{book.tahun_terbit}</p>
            </div>
            <div>
              <span className="detail-label">Kondisi Buku</span>
              <div className="mt-0.5">
                <span
                  className={`badge ${book.kondisi_buku ? "bg-primary text-primary/10" : "bg-gray-100 text-gray-600"}`}
                >
                  {book.kondisi_buku || "-"}
                </span>
              </div>
            </div>
            <div>
              <span className="detail-label">Sisa Stok</span>
              <p className="detail-text-bold">{book.stok_buku}</p>
            </div>
            <div>
              <span className="detail-label">Lokasi Rak</span>
              <p className="detail-text-primary-mono">{book.rak_buku}</p>
            </div>
          </div>
          <div className="detail-section">
            <span className="detail-label">Deskripsi Lengkap</span>
            <p className="detail-box-scrollable">
              {book.deskripsi_buku ||
                "Tidak ada deskripsi pelengkap untuk buku ini."}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-400">
          Tidak ada data buku yang ditemukan.
        </div>
      )}
    </Modal>
  );
};

export default BookDetailModal;

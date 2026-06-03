export interface Book {
  id_buku: string;
  isbn: string;
  judul_buku: string;
  tahun_terbit: string;
  stok_buku: number;
  rak_buku: string;
  deskripsi_buku: string;
}

export type BookTabs = "all" | "category" | "author" | "publisher";

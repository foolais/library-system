export interface CategoryBook {
  id: string;
  jenis_buku: string;
  deskripsi: string;
}

export type PayloadCategoryBook = Omit<CategoryBook, "id">;

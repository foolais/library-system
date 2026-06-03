export interface AuthorBook {
  id: string;
  penulis_buku: string;
  alamat_penulis: string;
  email_penulis: string;
  deskripsi: string;
}

export interface AuthorBookWithAlamat {
  id: string;
  penulis_buku: string;
  alamat: string;
  email_penulis: string;
  deskripsi: string;
}

export type PayloadAuthorBook = Omit<AuthorBook, "id">;

export interface PublisherBook {
  id: string;
  penerbit_buku: string;
  alamat_penerbit: string;
  telp_penerbit: string;
  email_penerbit: string;
  deskripsi_penerbit: string;
}

export type PayloadPublisherBook = Omit<PublisherBook, "id">;

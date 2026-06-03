export interface IFines {
  id_denda: string;
  jumlah_denda: string;
  tgl_pinjam: string;
  tgl_hrs_kembali: string;
  tgl_kembali: string;
  id_peminjaman: string;
  id_anggota: string;
}

export type PayloadFines = Omit<IFines, "id_denda">;

export interface ILoan {
  id: string;
  id_anggota: string;
  tgl_pinjam: string;
  tgl_hrs_kembali: string;
  jaminan: string;
}

export interface PayloadLoanExtend extends ILoan {
  id_peminjaman: string;
}
export type PayloadLoanCreate = Omit<PayloadLoanExtend, "id" | "id_peminjaman">;
export type PayloadLoanUpdate = Omit<PayloadLoanExtend, "id">;

export interface LoanDetail {
  id: string;
  anggota: {
    id_anggota: string;
    nama: string;
  };
  tgl_pinjam: string;
  tgl_hrs_kembali: string;
  jaminan: string;
  details: LoanDetailInnerItem[];
  created_at: string;
  updated_at: string;
}

export interface LoanDetailInnerItem {
  id_detailpinjam: string;
  id_buku: string;
  kondisi: string;
}

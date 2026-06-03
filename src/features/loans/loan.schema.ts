import { z } from "zod";

export const loanSchema = z.object({
  id_anggota: z.string().min(26, "ID Anggota minimal 26 karakter"),
  tgl_pinjam: z.string().min(6, "Tanggal Pinjam minimal 6 karakter"),
  tgl_hrs_kembali: z.string().min(6, "Tanggal Kembali minimal 6 karakter"),
  jaminan: z.string().min(3, "Jaminan minimal 3 karakter"),
});

export type LoanFormData = z.infer<typeof loanSchema>;

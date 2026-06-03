import { z } from "zod";

export const finesSchema = z.object({
  jumlah_denda: z
    .string()
    .regex(/^[0-9]+$/, { message: "Jumlah denda hanya boleh berisi angka" }),
  tgl_pinjam: z.string().min(6, "Tanggal Pinjam minimal 6 karakter"),
  tgl_hrs_kembali: z
    .string()
    .min(6, "Tanggal Harus Kembali minimal 6 karakter"),
  tgl_kembali: z.string().min(6, "Tanggal Kembali minimal 6 karakter"),
  id_peminjaman: z.string().min(26, "ID Peminjaman minimal 26 karakter"),
  id_anggota: z.string().min(26, "ID Anggota minimal 26 karakter"),
});

export type FinesFormData = z.infer<typeof finesSchema>;

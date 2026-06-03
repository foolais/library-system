import { z } from "zod";

export const publisherBookSchema = z.object({
  penerbit_buku: z.string().min(6, "Penerbit minimal 6 karakter"),
  alamat_penerbit: z.string().min(6, "Alamat is minimal 6 karakter"),
  telp_penerbit: z
    .string()
    .min(6, "Telp is minimal 6 karakter")
    .regex(/^[0-9]+$/, { message: "Nomor telepon hanya boleh berisi angka" }),
  email_penerbit: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  deskripsi_penerbit: z.string().min(6, "Deskripsi minimal 6 karakter"),
});

export type PublisherFormData = z.infer<typeof publisherBookSchema>;

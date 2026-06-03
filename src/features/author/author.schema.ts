import { z } from "zod";

export const authorBookSchema = z.object({
  penulis_buku: z.string().min(5, "Penulis is required"),
  alamat_penulis: z.string().min(5, "Alamat is required"),
  email_penulis: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  deskripsi: z.string().min(1, "Deskripsi is required"),
});

export type AuthorFormData = z.infer<typeof authorBookSchema>;

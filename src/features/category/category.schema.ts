import { z } from "zod";

export const categoryBookSchema = z.object({
  jenis_buku: z.string().min(1, "Jenis Buku is required"),
  deskripsi: z.string().min(1, "Description is required"),
});

export type CategoryFormData = z.infer<typeof categoryBookSchema>;

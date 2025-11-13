import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Nama mesti sekurang-kurangnya 2 aksara"),
  email: z.string().email("Emel tidak sah"),
  subject: z.string().min(3, "Subjek mesti sekurang-kurangnya 3 aksara"),
  enquiryType: z.enum(["Advertising", "General", "Recipe", "Other"], {
    errorMap: () => ({ message: "Sila pilih jenis pertanyaan" }),
  }),
  message: z.string().min(10, "Mesej mesti sekurang-kurangnya 10 aksara"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;


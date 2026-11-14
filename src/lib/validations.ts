import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "Please keep your name under 100 characters."),
  place: z.string().trim().min(2, "Please enter your place.").max(120),
  dars: z.string().trim().min(2, "Please enter your Dars.").max(120),
});

export type RegistrationValues = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Please enter at least 10 characters.").max(1000),
});

export type ContactValues = z.infer<typeof contactSchema>;

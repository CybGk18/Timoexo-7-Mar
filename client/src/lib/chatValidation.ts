import { z } from 'zod';

export const nameSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
});

export const contactSchema = z.object({
  phone: z.string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[\d\s()-]{10,20}$/, "Please enter a valid phone number"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
});

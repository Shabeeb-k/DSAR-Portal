import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(2),
  logo_url: z.string().url().optional().or(z.literal('')),
  address: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  employees_count: z.coerce.number().int().min(1),
  field: z.string().min(2),
  representation: z.enum(['EU', 'UK', 'EU_UK'])
});

export const dsarSchema = z.object({
  requester_name: z.string().min(2),
  requester_email: z.string().email(),
  requester_phone: z.string().optional(),
  request_text: z.string().min(5)
});

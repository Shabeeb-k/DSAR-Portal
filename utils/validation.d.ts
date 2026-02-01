// TypeScript declaration for validation module

declare module "utils/validation" {
  import { z } from "zod";
  export const companySchema: z.ZodObject<any>;
  export const dsarSchema: z.ZodObject<any>;
}

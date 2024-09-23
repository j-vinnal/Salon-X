import { z, ZodType } from "zod";
import { IBaseEntity } from "./IBaseEntity";

export interface ICompany extends IBaseEntity {
    companyName: string;
    companyLogoPath?: string;
    publicUrl: string;
  }

  export const EditCompanySchema = z.object({
    companyName: z.string().trim().min(1, { message: 'Company name is required' }),
    companyLogoPath: z.string().optional(),
    publicUrl: z.string().trim().min(1, { message: 'Public URL is required' }),
    id: z.string().optional(),
  }) satisfies ZodType<ICompany>;
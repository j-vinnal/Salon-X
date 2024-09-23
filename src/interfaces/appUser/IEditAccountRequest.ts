import { z, ZodType } from "zod";
import { IBaseEntity } from "../domain/IBaseEntity";

export interface IEditAccountRequest extends IBaseEntity{
    firstName: string;
    lastName: string;
    email: string;
    profilePicturePath?: string;
  }

  export const EditAccountSchema = z.object({
    firstName: z.string().trim().min(1, { message: 'First name is required' }),
    lastName: z.string().trim().min(1, { message: 'Last name is required' }),
    email: z.string().trim().email({ message: 'Invalid email address' }),
    profilePicturePath: z.string().optional(),
    id: z.string().optional(),
  }) satisfies ZodType<IEditAccountRequest>;
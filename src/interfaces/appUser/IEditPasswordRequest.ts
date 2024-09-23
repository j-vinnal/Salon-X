import { z, ZodType } from "zod";
import { IBaseEntity } from "../domain/IBaseEntity";

export interface IEditPasswordRequest extends IBaseEntity {
    password: string;
    currentPassword?: string;
  }

  export const EditPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, {message: 'Password must be at least 6 characters long'})
      .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase character'})
      .regex(/[a-z]/, {message: 'Password must contain at least one lowercase character'})
      .regex(/\d/, {message: 'Password must contain at least one digit'})
      .regex(/[^a-zA-Z0-9]/, {message: 'Password must contain at least one non-alphanumeric character'}),
      currentPassword: z.string().trim(),
      id: z.string().uuid(),
  })
  .refine(data => data.password != data.currentPassword, {
    message: "New password must be different from current password",
    path: ['password'], // path of error
  }) satisfies ZodType<IEditPasswordRequest>;
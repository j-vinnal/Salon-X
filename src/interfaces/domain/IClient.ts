import { z, ZodType } from "zod";
import { IBaseEntity } from "./IBaseEntity";

export interface IClient extends IBaseEntity {
    firstName: string;
    lastName: string; 
    email: string; 
    phoneNumber?: string; 
}

export const ClientSchema = z.object({
    firstName: z.string().trim().min(1, { message: 'First name is required' }),
    lastName: z.string().trim().min(1, { message: 'Last name is required' }), 
    email: z.string().email({ message: 'Invalid email address' }).trim().min(1, { message: 'Email is required' }), 
    phoneNumber: z.string().optional(),
    id: z.string().optional(),
}) satisfies ZodType<IClient>;
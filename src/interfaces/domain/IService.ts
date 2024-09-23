import {z, ZodType} from 'zod';
import {IBaseEntity} from './IBaseEntity';
import {stat} from 'fs';
import {EServiceStatus} from '../enums/EServiceStatus';

export interface IService extends IBaseEntity {
  serviceName: string;
  description: string;
  price: number;
  duration: number;
  status: EServiceStatus;
  companyId: string;
}

export const EditServiceSchema = z.object({
  id: z.string().optional(),
  serviceName: z
    .string()
    .trim()
    .min(1, {message: 'Service name is required'})
    .max(256, {message: 'Service name must be at most 256 characters long'}),
  description: z
    .string()
    .trim()
    .min(1, {message: 'Description is required'})
    .max(1024, {message: 'Description must be at most 1024 characters long'}),
  price: z.number(),
  duration: z.number(),
  status: z.nativeEnum(EServiceStatus),
  companyId: z.string(),
}) satisfies ZodType<IService>;

import { z, ZodType } from "zod";
import { EDayOfWeek } from "../enums/EDayOfWeek";
import { IBaseEntity } from "./IBaseEntity";

export interface IWorkingHour extends IBaseEntity {
    dayOfWeek: EDayOfWeek;
    startTime: string;
    endTime: string;
    isActive: boolean;
    companyId: string;
}

export const EditWorkingHourSchema = z.object({
    id: z.string().optional(),
    dayOfWeek: z.nativeEnum(EDayOfWeek),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Invalid time format, should be HH:MM' }),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Invalid time format, should be HH:MM' }),
    isActive: z.boolean(),
    companyId: z.string(),
}) satisfies ZodType<IWorkingHour>;
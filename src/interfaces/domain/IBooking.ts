import { z, ZodType } from "zod";
import { IBaseEntity } from "./IBaseEntity";
import { EBookingStatus } from "../enums/EBookingStatus";

export interface IBooking extends IBaseEntity {
    bookingDate: string; 
    startTime: string;
    endTime?: string; 
    status: EBookingStatus; 
    clientName?: string;
    clientId: string; 
    serviceName?: string;
    serviceId: string; 
}

export const bookingSchema = z.object({
    bookingDate:  z.string().min(1, { message: 'Start time is required' }),
    startTime: z.string().min(1, { message: 'Start time is required' }),
    endTime: z.string().optional(),
    status: z.nativeEnum(EBookingStatus),
    clientId: z.string().uuid({ message: 'Invalid Client ID' }), 
    serviceId: z.string().uuid({ message: 'Invalid Service ID' }),
    id: z.string().optional(),
}) satisfies ZodType<IBooking>;

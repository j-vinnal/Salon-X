import {IResultObject} from '@/interfaces/auth/IResultObject';
import {IBooking} from '@/interfaces/domain/IBooking';
import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {MonthlyRevenue} from '@/interfaces/MonthlyRevenue';
import {BaseEntityService} from '../base/BaseEntityService';

export class BookingService extends BaseEntityService<IBooking> {
  //takes setJwtResponse method as parameter
  constructor(setJwtResponse: ((data: IJWTResponse | undefined) => void) | null) {
    //sets base url
    super('v1/admin/bookings', setJwtResponse as (data: IJWTResponse | undefined) => void);
  }

  // Additional method to fetch total turnover
  async getTotalTurnover(jwtData: IJWTResponse, serviceId?: string): Promise<IResultObject<number>> {
    try {
      const url = serviceId ? `turnover?serviceId=${serviceId}` : 'turnover';
      const response = await this.axios.get<number>(url, {
        headers: {
          Authorization: 'Bearer ' + jwtData.jwt,
        },
      });
      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  // Additional method to fetch monthly turnover
  async getMonthlyTurnover(jwtData: IJWTResponse, serviceId?: string): Promise<IResultObject<MonthlyRevenue[]>> {
    try {
      const url = serviceId ? `monthly-turnover?serviceId=${serviceId}` : 'monthly-turnover';
      const response = await this.axios.get<MonthlyRevenue[]>(url, {
        headers: {
          Authorization: 'Bearer ' + jwtData.jwt,
        },
      });
      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }
}

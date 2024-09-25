import {IResultObject} from '@/interfaces/auth/IResultObject';
import {ICompanyWithServices} from '@/interfaces/ICompanyWithServices';
import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {BaseEntityService} from '../base/BaseEntityService';

export class CompanyServicePublic extends BaseEntityService<ICompanyWithServices> {
  // Update type
  //takes setJwtResponse method as parameter
  constructor(setJwtResponse: ((data: IJWTResponse | undefined) => void) | null) {
    //sets base url
    super('v1/public/companies', setJwtResponse as (data: IJWTResponse | undefined) => void);
  }

  async getCompanyByPublicUrlWithServices(publicUrl: string): Promise<IResultObject<ICompanyWithServices>> {
    try {
      const response = await this.axios.get<ICompanyWithServices>(publicUrl);
      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }
}

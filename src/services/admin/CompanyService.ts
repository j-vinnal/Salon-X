import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {IResultObject} from '@/interfaces/auth/IResultObject';
import {ICompany} from '@/interfaces/domain/ICompany';
import {BaseEntityService} from '../base/BaseEntityService';

export class CompanyService extends BaseEntityService<ICompany> {
  //takes setJwtResponse method as parameter
  constructor(setJwtResponse: ((data: IJWTResponse | undefined) => void) | null) {
    //sets base url
    super('v1/admin/companies', setJwtResponse as (data: IJWTResponse | undefined) => void);
  }

}

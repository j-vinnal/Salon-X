import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {IService} from '@/interfaces/domain/IService';
import {BaseEntityService} from '../base/BaseEntityService';

export class ServiceService extends BaseEntityService<IService> {
  //takes setJwtResponse method as parameter
  constructor(setJwtResponse: ((data: IJWTResponse | undefined) => void) | null) {
    //sets base url
    super('v1/admin/services', setJwtResponse as (data: IJWTResponse | undefined) => void);
  }
}

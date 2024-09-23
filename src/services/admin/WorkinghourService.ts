import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {IWorkingHour} from '@/interfaces/domain/IWorkingHour';
import {BaseEntityService} from '../base/BaseEntityService';

export class WorkingHourService extends BaseEntityService<IWorkingHour> {
  //takes setJwtResponse method as parameter
  constructor(setJwtResponse: ((data: IJWTResponse | undefined) => void) | null) {
    //sets base url
    super('v1/admin/workinghours', setJwtResponse as (data: IJWTResponse | undefined) => void);
  }
}

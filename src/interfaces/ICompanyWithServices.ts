import {IService} from './domain/IService';
import {IBaseEntity} from './domain/IBaseEntity';

export interface ICompanyWithServices extends IBaseEntity {
  companyName: string;
  companyLogoPath: string | null;
  publicUrl: string;
  services: IService[];
}

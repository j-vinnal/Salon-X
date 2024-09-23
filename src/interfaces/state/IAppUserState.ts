import { IBaseEntity } from "../domain/IBaseEntity";

export interface IAppUserState extends IBaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profilePicturePath?: string;
  //companyName?: string;
  //companyLogoPath?: string;
  //companyId?: string;
  //companyPublicUrl?: string;
}

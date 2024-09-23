import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {IClient} from '@/interfaces/domain/IClient';
import {BaseEntityService} from '../base/BaseEntityService';

export class ClientServicePublic extends BaseEntityService<IClient> {
  //takes setJwtResponse method as parameter
  constructor(setJwtResponse: ((data: IJWTResponse | undefined) => void) | null) {
    //sets base url
    super('v1/public/clients', setJwtResponse as (data: IJWTResponse | undefined) => void);
  }
}

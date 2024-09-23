

import { IAppUserState } from '@/interfaces/state/IAppUserState';
import {createContext} from 'react';

export interface IUserContext {
  user: IAppUserState | null;
  setUser: (user: IAppUserState | null) => void;
}

export const UserContext = createContext<IUserContext | null>(null);

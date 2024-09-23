import {ICompany} from '@/interfaces/domain/ICompany';
import {createContext} from 'react';

export interface ICompanyContext {
  company: ICompany | null;
  setCompany: (company: ICompany | null) => void;
  refetch: () => Promise<void>;
}

export const CompanyContext = createContext<ICompanyContext | null>(null);

import useEntityActions from '@/hooks/base/useEntityActions';
import {ICompany} from '@/interfaces/domain/ICompany';
import {CompanyService} from '@/services/admin/CompanyService';
import {ReactNode, useContext, useEffect, useState} from 'react';
import {CompanyContext} from '../contexts/CompanyContext';
import {JWTContext} from '../contexts/JWTContext';

export const CompanyProvider = ({children}: {children: ReactNode}) => {
  const {entities: companies, refetch} = useEntityActions<ICompany>(CompanyService);
  const [company, setCompany] = useState<ICompany | null>(null);
  const {jwtResponse} = useContext(JWTContext)!;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

  useEffect(() => {
    if (jwtResponse && companies.length > 0 && companies[0]) {
      try {
        setCompany({
          ...companies[0],
          companyLogoPath: companies[0].companyLogoPath ? backendUrl + companies[0].companyLogoPath : undefined,
        });
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }
  }, [jwtResponse, companies, backendUrl]);

  return <CompanyContext.Provider value={{company, setCompany, refetch}}>{children}</CompanyContext.Provider>;
};

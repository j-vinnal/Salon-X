import {ICompanyWithServices} from '@/interfaces/ICompanyWithServices';
import {CompanyServicePublic} from '@/services/public/CompanyServicePublic';
import {JWTContext} from '@/states/contexts/JWTContext';
import {handleResponseErrors} from '@/utils/handleResponseErrors';
import {useContext, useEffect, useState, useCallback} from 'react';

const usePublicCompany = (publicUrl: string) => {
  const {setJwtResponse} = useContext(JWTContext)!;
  const [companies, setCompanies] = useState<ICompanyWithServices | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyAndServices = useCallback(async () => {
    setLoading(true);
    try {
      const companyService = new CompanyServicePublic(setJwtResponse);
      const response = await companyService.getCompanyByPublicUrlWithServices(publicUrl);
      handleResponseErrors(response);

      if (response?.data) {
        setCompanies(response.data);
      } else {
        setCompanies(undefined);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [publicUrl, setJwtResponse]);

  useEffect(() => {
    fetchCompanyAndServices();
  }, [fetchCompanyAndServices]);

  return {companies, loading, error};
};

export default usePublicCompany;

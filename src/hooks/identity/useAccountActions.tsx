'use client';	

import {IEditAccountRequest} from '@/interfaces/appUser/IEditAccountRequest';
import {IEditPasswordRequest} from '@/interfaces/appUser/IEditPasswordRequest';
import {ILoginData} from '@/interfaces/auth/ILoginData';
import { IRegisterData } from '@/interfaces/auth/IRegisterData';
import {IdentityService} from '@/services/admin/IdentityService';
import { CompanyContext } from '@/states/contexts/CompanyContext';
import {JWTContext} from '@/states/contexts/JWTContext';
import { checkJwtAndHandleError } from '@/utils/checkJwtAndHandleError';
import { handleResponseErrors } from '@/utils/handleResponseErrors';
import { useRouter } from 'next/navigation';
import {useContext} from 'react';


const useAccountActions = () => {
  const {jwtResponse, setJwtResponse} = useContext(JWTContext)!; 
  const router = useRouter();

  const editAccount = async (id: string, account: IEditAccountRequest) => {
    const identityService = new IdentityService();
    try {
      checkJwtAndHandleError(jwtResponse);
      const response = await identityService.editAccount(id, account, jwtResponse!);
      handleResponseErrors(response);
      setJwtResponse(response.data);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const editPassword = async (id: string, account: IEditPasswordRequest) => {
    const identityService = new IdentityService();
    try {
      checkJwtAndHandleError(jwtResponse);
      const response = await identityService.editPassword(id, account, jwtResponse!);
      handleResponseErrors(response);
      setJwtResponse(response.data);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const loginAccount = async (account: ILoginData) => {
    const identityService = new IdentityService();
    try {
      const response = await identityService.login(account);
      handleResponseErrors(response);
      setJwtResponse(response.data);
      router.push('/');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const logoutAccount = async () => {
    const identityService = new IdentityService();
    try {
      const response = await identityService.logout(jwtResponse!, router);
      setJwtResponse(undefined);
      router.push('/signin');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const registerAccount = async (account: IRegisterData) => {
    const identityService = new IdentityService();
    try {
      const response = await identityService.register(account);
      handleResponseErrors(response);
      setJwtResponse(response.data);
      router.push('/');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return {editAccount, editPassword, loginAccount, registerAccount, logoutAccount};
};

export default useAccountActions;

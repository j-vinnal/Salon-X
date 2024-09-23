'use client';

import {ILoginData, LoginSchema} from '@/interfaces/auth/ILoginData';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import useAccountActions from './useAccountActions';


const useLoginForm = () => {
  const {loginAccount} = useAccountActions();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
  } = useForm<ILoginData>({
    defaultValues: {
      email: 'admin@bh.com',
      password: 'Foo.Bar1',
    },
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: ILoginData) => {
    try {
      await loginAccount(data);
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', {type: 'server', message: (error as Error).message});
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleLogin,
  };
};

export default useLoginForm;

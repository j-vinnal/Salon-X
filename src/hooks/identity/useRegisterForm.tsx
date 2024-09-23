'use client';

import {IRegisterData, RegisterSchema} from '@/interfaces/auth/IRegisterData';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import useAccountActions from './useAccountActions';

const useRegisterForm = () => {
  const {registerAccount} = useAccountActions();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
  } = useForm<IRegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = async (data: IRegisterData) => {
    try {
      await registerAccount(data);
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
    handleRegister,
  };
};

export default useRegisterForm;

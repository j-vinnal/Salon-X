

import {EditPasswordSchema, IEditPasswordRequest} from '@/interfaces/appUser/IEditPasswordRequest';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import useAccountActions from './useAccountActions';

const usePasswordForm = () => {
  const {editPassword} = useAccountActions();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
    reset,
  } = useForm<IEditPasswordRequest>({
    resolver: zodResolver(EditPasswordSchema),
  });

  const handleEditPassword = async (data: IEditPasswordRequest) => {
    try {
      await editPassword(data.id!, data);
      toast.success('Password updated successfully!');
      reset(data); // Reset the form with the updated data
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
    setError,
    reset,
    handleEditPassword,
  };
};

export default usePasswordForm;

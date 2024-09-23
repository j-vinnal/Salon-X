

import {EditAccountSchema, IEditAccountRequest} from '@/interfaces/appUser/IEditAccountRequest';
import {IAppUserState} from '@/interfaces/state/IAppUserState';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import useAccountActions from './useAccountActions';

const useAccountForm = (account: IAppUserState | null) => {
  const {editAccount} = useAccountActions();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
    setValue,
    reset,
  } = useForm<IEditAccountRequest>({
    defaultValues: {
      firstName: account?.firstName || undefined,
      lastName: account?.lastName || undefined,
      email: account?.email || undefined,
      profilePicturePath: account?.profilePicturePath || undefined,
    },
    resolver: zodResolver(EditAccountSchema),
  });

  const handleEditAccount = async (data: IEditAccountRequest) => {
    try {
      await editAccount(data.id!, data);
      toast.success('Account updated successfully!');
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
    setValue,
    reset,
    handleEditAccount,
  };
};

export default useAccountForm;

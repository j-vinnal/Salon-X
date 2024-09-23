'use client';

import FormField from '@/components/ui/form/FormField';
import usePasswordForm from '@/hooks/identity/usePasswordForm';
import {UserContext} from '@/states/contexts/UserContext';
import {Lock} from 'lucide-react';
import {useContext, useEffect} from 'react';

const PasswordForm = () => {
  const {user} = useContext(UserContext)!;
  const {register, handleSubmit, errors, isSubmitting, handleEditPassword, reset} = usePasswordForm();

  // Set form values to user data
  useEffect(() => {
    if (user) {
      reset({
        currentPassword: undefined,
        password: undefined,
        id: user.id || undefined,
      });
    }
  }, [user, reset]);

  return (
    <div className='card'>
      <div className='card-header'>
        <h3>Change Password</h3>
        {isSubmitting}
      </div>
      {errors.root && <div className='form-error'>{errors.root.message}</div>}

      <div className='card-body'>
        <form onSubmit={handleSubmit(handleEditPassword)}>
          <input id='username' type='text' autoComplete='username' className='hidden' aria-hidden='true' />

          <FormField
            label='Current Password'
            id='current-password'
            register={register('currentPassword')}
            error={errors.currentPassword}
            type='password'
            autoComplete='password'
            icon={<Lock className='form-icon' />}
          />

          <FormField
            label='New Password'
            id='password'
            register={register('password')}
            error={errors.password}
            type='password'
            autoComplete='new-password'
            icon={<Lock className='form-icon' />}
          />

          <div className='flex justify-end gap-4.5 pt-4'>
            <button className='form-button-secondary'>Cancel</button>
            <button className='form-button-primary' type='submit' disabled={isSubmitting}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;

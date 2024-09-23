'use client';

import FormField from '@/components/ui/form/FormField';
import LogoUploadForm from '@/components/ui/form/LogoUploadForm';
import useAccountForm from '@/hooks/identity/useAccountForm';
import useFileUpload from '@/hooks/uploads/useFileUpload';
import {UserContext} from '@/states/contexts/UserContext';
import {Mail, UserRound} from 'lucide-react';
import {useContext, useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';

const AccountForm = () => {
  const {user} = useContext(UserContext)!;
  const {imagePreview, handleFileChange, logoPath} = useFileUpload();
  const {register, handleSubmit, errors, isSubmitting, setValue, reset, handleEditAccount} = useAccountForm(user);

  // Set form values to user data
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        email: user.email || undefined,
        profilePicturePath: undefined,
        id: user.id || undefined,
      });
    }
  }, [user, reset]);

  // Set user logo path to form value after image upload
  useEffect(() => {
    if (logoPath) {
      setValue('profilePicturePath', logoPath, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [logoPath, setValue]);

  return (
    <div className='card'>
      <div className='card-header'>
        <h3>Personal Information</h3>
      </div>
      {errors.root && <div className='form-error'>{errors.root.message}</div>}
      {user?.profilePicturePath}

      <div className='card-body'>
        <form onSubmit={handleSubmit(handleEditAccount)}>
          <div className='flex flex-col sm:flex-row sm:gap-5.5'>
            <div className='w-full sm:w-1/2'>
              <FormField
                label='First Name'
                id='firstName'
                register={register('firstName')}
                error={errors.firstName}
                icon={<UserRound className='form-icon' />}
              />
            </div>

            <div className='w-full sm:w-1/2'>
              <FormField label='Last Name' id='lastName' register={register('lastName')} error={errors.lastName} />
            </div>
          </div>

          <FormField label='Email Address' id='email' register={register('email')} error={errors.email} type='email' icon={<Mail className='form-icon' />} />

          <LogoUploadForm
            imagePreview={imagePreview}
            imageStyle='size-14 overflow-hidden rounded-full'
            handleFileChange={handleFileChange}
            logoPath={user?.profilePicturePath}
            errors={errors.profilePicturePath && <div className='form-error'>{errors.profilePicturePath.message}</div>}
            label='Your Photo'
            placeholderContent={<>{user?.firstName?.charAt(0).toUpperCase()}</>}
          />

          <div className='flex justify-end gap-4.5 pt-4'>
            <button className='form-button-secondary'>Cancel</button>
            <button disabled={isSubmitting} className='form-button-primary' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;

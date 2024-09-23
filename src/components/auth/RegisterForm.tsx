'use client';

import useRegisterForm from '@/hooks/identity/useRegisterForm';
import {Lock, Mail, UserRound} from 'lucide-react';
import Link from 'next/link';
import {GoogleIcon} from '../_icons/auth/GoogleIcon';
import FormField from '../ui/form/FormField';

const RegisterForm = () => {
  const {register, handleSubmit, errors, isSubmitting, handleRegister} = useRegisterForm();

  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='font-semibold'>Sign Up</h3>
      </div>
      {errors.root && <div className='form-error'>{errors.root.message}</div>}
      <div className='card-body'>
        <form onSubmit={handleSubmit(handleRegister)}>
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

          <FormField label='Email' id='email' register={register('email')} error={errors.email} icon={<Mail className='form-icon' />} />

          <FormField
            label='Password'
            id='password'
            register={register('password')}
            error={errors.password}
            type='password'
            autoComplete='password'
            icon={<Lock className='form-icon' />}
          />

          <FormField
            label='Confirm Password'
            id='confirmedPassword'
            register={register('confirmedPassword')}
            error={errors.confirmedPassword}
            type='password'
            autoComplete='password'
            icon={<Lock className='form-icon' />}
          />

          <div className='pt-6'>
            <button
              disabled={isSubmitting}
              type='submit'
              className='flex w-full cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-primary/90 disabled:bg-primary/90'>
              <span className='pl-4.5'>Create account</span>
            </button>

            <button className='mt-4 flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke p-4 hover:shadow-1 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-meta-4/50'>
              <span>
                <GoogleIcon width={20} height={20} />
              </span>
              Sign up with Google
            </button>

            <div className='py-6 text-center'>
              <p>
                Already have an account?
                <Link href='/signin' className='pl-1 text-primary no-underline'>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

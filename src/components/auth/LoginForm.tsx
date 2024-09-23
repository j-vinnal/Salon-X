'use client';

import {GoogleIcon} from '@/components/_icons/auth/GoogleIcon';
import FormField from '@/components/ui/form/FormField';
import useLoginForm from '@/hooks/identity/useLoginForm';
import {Lock, Mail} from 'lucide-react';
import Link from 'next/link';

const LoginForm = () => {
  const {register, handleSubmit, errors, isSubmitting, handleLogin} = useLoginForm();

  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='font-semibold'>Sign In</h3>
      </div>

      {errors.root && <div className='form-error'>{errors.root.message}</div>}

      <div className='card-body'>
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormField
            label='Email'
            id='email'
            register={register('email')}
            error={errors.email}
            type='email'
            autoComplete='username'
            icon={<Mail className='form-icon' />}
          />

          <FormField
            label='Password'
            id='password'
            register={register('password')}
            error={errors.password}
            type='password'
            autoComplete='current-password'
            icon={<Lock className='form-icon' />}
          />

          <div className='pt-6'>
            <button
              disabled={isSubmitting}
              type='submit'
              className='flex w-full cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary p-4 text-white hover:bg-primary/90 hover:shadow-1 disabled:bg-primary/90'>
              <span className='pl-4.5'>Sign In</span>
            </button>

            <button className='mt-4 flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke p-4 hover:shadow-1 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-meta-4/50'>
              <span>
                <GoogleIcon width={20} height={20} />
              </span>
              Sign in with Google
            </button>

            <div className='py-6 text-center'>
              <p>
              {"Don't have an account?"}
                <Link href='/signup' className='pl-1 text-primary no-underline'>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

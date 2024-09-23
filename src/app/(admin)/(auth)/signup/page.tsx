

import RegisterForm from '@/components/auth/RegisterForm';
import DefaultLayout from '@/components/layouts/AuthLayout';
import InfoSection from '@/components/ui/InfoSection';
import appConfig from '@/config/appConfig';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Sign Up - ${appConfig.appName}`,
  description: `Create an account on ${appConfig.appName} to get started.`,
  keywords: 'sign up, register, create account',
};

const SignUp = () => {
  return (
    <DefaultLayout>
      <div className='flex items-center justify-center'>
        <div className='grid w-full max-w-6xl grid-cols-1 gap-8 xl:grid-cols-5'>
          <div className='col-span-5 xl:col-span-2'>
            <InfoSection />
          </div>

          <div className='col-span-5 xl:col-span-3'>
            <RegisterForm />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;



import LoginForm from '@/components/auth/LoginForm';
import DefaultLayout from '@/components/layouts/AuthLayout';
import InfoSection from '@/components/ui/InfoSection';
import appConfig from '@/config/appConfig';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Sign In - ${appConfig.appName}`,
  description: `Sign in to ${appConfig.appName} to access your account and manage your settings.`,
  keywords: 'sign in, login, account access',
};

const SignIn = () => {
  return (
    <DefaultLayout>
      <div className='flex items-center justify-center'>
        <div className='grid w-full max-w-6xl grid-cols-1 gap-8 xl:grid-cols-5'>
          <div className='col-span-5 xl:col-span-2'>
            <InfoSection />
          </div>

          <div className='col-span-5 xl:col-span-3'>
            <LoginForm />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;

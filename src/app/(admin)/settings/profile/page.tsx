import AdminLayout from '@/components/layouts/AdminLayout';
import AccountForm from '@/components/settings/profile/AccountForm';
import PasswordForm from '@/components/settings/profile/PasswordForm';
import appConfig from '@/config/appConfig';

import {Metadata} from 'next';

export const metadata: Metadata = {
  title: `Profile Settings - ${appConfig.appName}`,
  description: `Manage your profile settings and password on ${appConfig.appName}.`,
  keywords: 'account settings, profile settings, password settings',
};

const ProfilePage = () => {
  return (
    <AdminLayout>
      <div className='mx-auto max-w-270'>
        <div className='grid grid-cols-5 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <AccountForm />
          </div>
          <div className='col-span-5 xl:col-span-2'>
            <PasswordForm />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfilePage;

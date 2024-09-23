import AdminLayout from '@/components/layouts/AdminLayout';
import CompanyCard from '@/components/settings/company/CompanyCard';
import InfoSection from '@/components/ui/InfoSection';
import appConfig from '@/config/appConfig';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: `Company Settings - ${appConfig.appName}`,
  description: `Manage your company settings and working hours on ${appConfig.appName}.`,
  keywords: 'company settings, working hours, opening hours',
};

const CompanyPage = () => {
  return (
    <AdminLayout>
      <div className='mx-auto max-w-270'>
        <div className='grid grid-cols-5 gap-8'>
          <div className='col-span-5 xl:col-span-3'>
            <CompanyCard />
          </div>
          <div className='col-span-5 xl:col-span-2'>
            <InfoSection />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CompanyPage;

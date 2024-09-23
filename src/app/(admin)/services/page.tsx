import AdminLayout from '@/components/layouts/AdminLayout';
import ServicesPageClient from '@/components/services/ServicesPageClient';
import appConfig from '@/config/appConfig';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Services - ${appConfig.appName}`,
  description: `Manage your services on ${appConfig.appName}.`,
  keywords: 'services, service management',
};

const ServicesPage = () => {
  return (
    <AdminLayout>
      <ServicesPageClient />
    </AdminLayout>
  );
};

export default ServicesPage;

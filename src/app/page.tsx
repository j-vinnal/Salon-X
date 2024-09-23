import DashboardPageClient from '@/components/dashboard/DashboardPageClient';
import AdminLayout from '@/components/layouts/AdminLayout';
import appConfig from '@/config/appConfig';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Dashboard - ${appConfig.appName}`,
  description: `Overview of your beauty service business on ${appConfig.appName}.`,
  keywords: 'dashboard, beauty service, business overview',
};

const DashboardPage = () => {
  return (
    <AdminLayout>
      <DashboardPageClient />
    </AdminLayout>
  );
};

export default DashboardPage;

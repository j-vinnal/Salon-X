import ClientsPageClient from '@/components/clients/ClientsPageClient';
import AdminLayout from '@/components/layouts/AdminLayout';
import appConfig from '@/config/appConfig';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Clients - ${appConfig.appName}`,
  description: `Manage your clients on ${appConfig.appName}.`,
  keywords: 'clients, customer management',
};

const ClientsPage = () => {
  return (
    <AdminLayout>
      <ClientsPageClient />
    </AdminLayout>
  );
};

export default ClientsPage;

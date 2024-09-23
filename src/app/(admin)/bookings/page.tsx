import BookingsPageClient from '@/components/booking/BookingsPageClient';
import AdminLayout from '@/components/layouts/AdminLayout';
import appConfig from '@/config/appConfig';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Bookings - ${appConfig.appName}`,
  description: `Manage your bookings on ${appConfig.appName}.`,
  keywords: 'bookings, appointments, schedule',
};

const BookingsPage = () => {
  return (
    <AdminLayout>
      <BookingsPageClient />
    </AdminLayout>
  );
};

export default BookingsPage;

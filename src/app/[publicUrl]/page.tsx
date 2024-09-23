import DefaultLayout from '@/components/layouts/AuthLayout';
import PublicBookingPageClient from '@/components/public/PublicBookingPageClient';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Booking Page',
  description: 'This is the public booking page.',
};

const PublicBookingPage = (params: {params: {publicUrl?: string}}) => {
  return (
    <DefaultLayout>
      <PublicBookingPageClient publicUrl={params.params.publicUrl!} />
    </DefaultLayout>
  );
};

export default PublicBookingPage;

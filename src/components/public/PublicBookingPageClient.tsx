'use client';

import BookingForm from '@/components/public/BookingForm';
import BookingSummary from '@/components/public/BookingSummary';
import ServiceList from '@/components/public/ServiceList';
import usePublicBookingPage from '@/hooks/public/usePublicBookingPage';

const PublicBookingPageClient = ({ publicUrl }: { publicUrl: string }) => {
  const {
    selectedDate,
    setSelectedDate,
    selectedService,
    setSelectedService,
    selectedTimeSlot,
    showSummary,
    bookingSuccess,
    clientDetails,
    companies,
    loading,
    error,
    handleClientDetailsChange,
    handleTimeSlotSelection,
    handleBookingSubmit,
    timeSlots,
  } = usePublicBookingPage(publicUrl);

  return (
    <div className='min-h-screen'>
      <header
        className='flex h-96 items-center justify-center bg-cover bg-center'
        style={{
          backgroundImage:
            `url('${process.env.NEXT_PUBLIC_BASE_URL}/images/public/background.avif')`,
        }}>
        <div className='rounded-lg bg-black/50 p-8 text-center text-white'>
          <h1 className='mb-4 text-5xl font-bold text-white'>{companies?.companyName}</h1>
          <p className='text-xl'>Your one-stop destination for all beauty services</p>
        </div>
      </header>

      <main className='container mx-auto px-4 py-12'>
        <ServiceList services={companies?.services} selectedService={selectedService} setSelectedService={setSelectedService} />

        {selectedService && !bookingSuccess && (
          <BookingForm
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            timeSlots={timeSlots}
            selectedTimeSlot={selectedTimeSlot}
            handleTimeSlotSelection={handleTimeSlotSelection}
            handleBookingSubmit={handleBookingSubmit}
            clientDetails={clientDetails}
            handleClientDetailsChange={handleClientDetailsChange}
          />
        )}

        {showSummary && !bookingSuccess && (
          <BookingSummary
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            clientDetails={clientDetails}
            handleBookingSubmit={handleBookingSubmit}
            handleClientDetailsChange={handleClientDetailsChange}
          />
        )}
      </main>
    </div>
  );
};

export default PublicBookingPageClient;

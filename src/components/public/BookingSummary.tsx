import React from 'react';
import FormField from '@/components/ui/form/FormField';
import { IService } from '@/interfaces/domain/IService';
import { IClient } from '@/interfaces/domain/IClient';

interface BookingSummaryProps {
  selectedService: IService | null;
  selectedDate: string;
  selectedTimeSlot: string; 
  clientDetails: IClient;
  handleBookingSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClientDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedService,
  selectedDate,
  selectedTimeSlot,
  clientDetails,
  handleBookingSubmit,
  handleClientDetailsChange,
}) => {
  return (
    <section className='mb-12'>
      <h2 className='mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white'>Booking Summary</h2>
      <div className='mx-auto max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'>
        <div className='mb-4'>
          <h3 className='mb-2 text-xl font-semibold text-gray-800 dark:text-white'>Selected Service</h3>
          <p className='text-gray-600 dark:text-gray-300'>
            {selectedService?.serviceName} - €{selectedService?.price}
          </p>
        </div>
        <div className='mb-4'>
          <h3 className='mb-2 text-xl font-semibold text-gray-800 dark:text-white'>Appointment Details</h3>
          <p className='text-gray-600 dark:text-gray-300'>Date: {selectedDate}</p>
          <p className='text-gray-600 dark:text-gray-300'>Time: {selectedTimeSlot}</p>
        </div>
        <form onSubmit={handleBookingSubmit}>
          <div className='mb-4'>
            <FormField
              label='First Name '
              id='firstName'
              name='firstName'
              type='text'
              value={clientDetails.firstName}
              onChange={handleClientDetailsChange}
              required
            />
          </div>
          <div className='mb-4'>
            <FormField
              label='Last Name '
              id='lastName'
              name='lastName'
              type='text'
              value={clientDetails.lastName}
              onChange={handleClientDetailsChange}
              required
            />
          </div>
          <div className='mb-4'>
            <FormField label='Email' id='email' name='email' type='text' value={clientDetails.email} onChange={handleClientDetailsChange} required />
          </div>
          <div className='mb-4'>
            <FormField
              label='Phone Number'
              id='phoneNumber'
              name='phoneNumber'
              type='text'
              value={clientDetails.phoneNumber}
              onChange={handleClientDetailsChange}
              required
            />
          </div>
          <button type='submit' className='w-full rounded-lg bg-primary px-4 py-2 text-white transition duration-300 hover:bg-gray-700'>
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingSummary;
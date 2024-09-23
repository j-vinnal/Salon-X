import React from 'react';
import FormField from '@/components/ui/form/FormField';
import { Clock4 } from 'lucide-react';
import { IClient } from '@/interfaces/domain/IClient';

interface BookingFormProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  timeSlots: string[];
  selectedTimeSlot: string;
  handleTimeSlotSelection: (slot: string) => void;
  handleBookingSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  clientDetails: IClient;
  handleClientDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedDate,
  setSelectedDate,
  timeSlots,
  selectedTimeSlot,
  handleTimeSlotSelection,
  handleBookingSubmit,
  clientDetails,
  handleClientDetailsChange,
}) => {
  return (
    <section className='mb-12'>
      <h2 className='mb-8 text-center text-3xl font-bold'>Book Your Appointment</h2>
      <div className='mx-auto max-w-md'>
        <div className='mb-6'>
          <FormField label='Booking Date' id='bookingDate' type='date' value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        </div>
        {selectedDate && (
          <div>
            <h3 className='mb-4 text-xl font-semibold text-gray-800 dark:text-white'>Available Time Slots</h3>
            <div className='grid grid-cols-3 gap-4'>
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`flex items-center justify-center rounded-lg border border-stroke bg-white px-4 py-2 text-black transition duration-300 dark:border-strokedark dark:bg-gray-800 dark:text-white ${selectedTimeSlot === slot ? 'ring-2 ring-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  onClick={() => handleTimeSlotSelection(slot)}>
                  <Clock4 width={20} height={20} className='mr-2 text-body dark:text-bodydark' />
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
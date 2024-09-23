'use client';

import BookingModal from '@/components/booking/BookingModal';
import ViewBookings from '@/components/booking/ViewBookings';
import useBookingsPage from '@/hooks/bookings/useBookingsPage';

const BookingsPageClient = () => {
  const {isModalOpen, modalMode, selectedBooking, entities, closeModal, openAddBookingModal, openEditBookingModal, handleFormSubmit, handleDeleteBooking} =
    useBookingsPage();

  return (
    <div className='flex flex-col gap-6'>
      <ViewBookings bookings={entities} onOpenBookingModal={openAddBookingModal} onEdit={openEditBookingModal} onDelete={handleDeleteBooking} />
      {isModalOpen && (
        <>
          <div className='fixed inset-0 z-40 bg-boxdark/70 dark:bg-meta-4/70' onClick={closeModal}></div>
          <div className='fixed inset-0 z-50 flex items-center justify-center' onClick={closeModal}>
            <div onClick={e => e.stopPropagation()} className='w-150'>
              <BookingModal mode={modalMode} initialData={selectedBooking} onClose={closeModal} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingsPageClient;

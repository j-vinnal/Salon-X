import { useState, useContext } from 'react';
import { IBooking } from '@/interfaces/domain/IBooking';
import { BookingService } from '@/services/admin/BookingService';
import { ModalContext } from '@/states/contexts/ModalContext';
import useEntityActions from '@/hooks/base/useEntityActions';
import { toast } from 'react-toastify';

const useBookingsPage = () => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext)!;
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const { addEntity, editEntity, deleteEntity, entities, loading, error, refetch } = useEntityActions<IBooking>(BookingService);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const openAddBookingModal = () => {
    setModalMode('add');
    setIsModalOpen(true);
  };

  const openEditBookingModal = (booking: IBooking) => {
    setModalMode('edit');
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleAddBooking = async (booking: IBooking) => {
    try {
      await addEntity(booking);
      toast.success('Booking added successfully!');
      refetch();
      closeModal();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleEditBooking = async (booking: IBooking) => {
    if (selectedBooking?.id) {
      try {
        await editEntity(selectedBooking.id, booking);
        toast.success('Booking updated successfully!');
        refetch();
        closeModal();
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  const handleFormSubmit = async (data: IBooking) => {
    if (modalMode === 'add') {
      await handleAddBooking(data);
    } else {
      await handleEditBooking(data);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      await deleteEntity(bookingId);
      toast.success('Booking deleted successfully!');
      refetch();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return {
    isModalOpen,
    modalMode,
    selectedBooking,
    entities,
    closeModal,
    openAddBookingModal,
    openEditBookingModal,
    handleFormSubmit,
    handleDeleteBooking,
  };
};

export default useBookingsPage;
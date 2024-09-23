'use client';

import { useEffect, useState } from 'react';
import useEntityActions from '@/hooks/base/useEntityActions';
import usePublicCompany from '@/hooks/public/usePublicCompany';
import { IBooking } from '@/interfaces/domain/IBooking';
import { IClient } from '@/interfaces/domain/IClient';
import { IService } from '@/interfaces/domain/IService';
import { BookingServicePublic } from '@/services/public/BookingServicePublic';
import { ClientServicePublic } from '@/services/public/ClientServicePublic';
import { toast } from 'react-toastify';

const usePublicBookingPage = (publicUrl: string) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [showSummary, setShowSummary] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [clientDetails, setClientDetails] = useState<IClient>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

 useEffect(() => {
    setBookingSuccess(false);
  }, [selectedService]);

  const { addEntity: addClientPublic } = useEntityActions<IClient>(ClientServicePublic, true);
  const { addEntity: addBookingPublic } = useEntityActions<IBooking>(BookingServicePublic, true);
  const { companies, loading, error } = usePublicCompany(publicUrl);

  const handleClientDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientDetails({
      ...clientDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeSlotSelection = (slot: string) => {
    setSelectedTimeSlot(slot);
    setShowSummary(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const clientData = await addClientPublic(clientDetails);

      const bookingData: IBooking = {
        bookingDate: selectedDate,
        startTime: formatTime(selectedTimeSlot),
        clientId: clientData?.id || '',
        serviceId: selectedService?.id!,
        status: 0,
      };

      await addBookingPublic(bookingData);
      toast.success('Booking added successfully!');
      setBookingSuccess(true);
      setSelectedService(null);
      setSelectedDate('');
      setSelectedTimeSlot('');
      setShowSummary(false);
      setClientDetails({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  };

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  return {
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
  };
};

export default usePublicBookingPage;

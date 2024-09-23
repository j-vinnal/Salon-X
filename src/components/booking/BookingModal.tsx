import useEntityActions from '@/hooks/base/useEntityActions';
import {bookingSchema, IBooking} from '@/interfaces/domain/IBooking';
import {IClient} from '@/interfaces/domain/IClient';
import {IService} from '@/interfaces/domain/IService';
import {EBookingStatus} from '@/interfaces/enums/EBookingStatus';
import {ClientService} from '@/services/admin/ClientService';
import {ServiceService} from '@/services/admin/ServiceService';
import {zodResolver} from '@hookform/resolvers/zod';
import {X} from 'lucide-react';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormField from '../ui/form/FormField';

interface IBookingModalProps {
  mode: 'add' | 'edit';
  initialData: IBooking | null;
  onClose: () => void;
  onSubmit: (booking: IBooking) => void;
}

const BookingModal: React.FC<IBookingModalProps> = ({mode, initialData, onClose, onSubmit}) => {
  const {entities: clients, loading: clientsLoading, error: clientsError} = useEntityActions<IClient>(ClientService);
  const {entities: services, loading: servicesLoading, error: servicesError} = useEntityActions<IService>(ServiceService);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<IBooking>({
    defaultValues: initialData || {
      bookingDate: '',
      startTime: '',
      endTime: undefined,
      status: EBookingStatus.Pending,
      clientId: '',
      serviceId: '',
    },
    resolver: zodResolver(bookingSchema),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    return new Date(date.getTime() - userTimezoneOffset).toISOString().split('T')[0];
  };

  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        bookingDate: initialData.bookingDate ? formatDate(initialData.bookingDate) : '',
        clientId: initialData.clientId || '',
      };
      reset(formattedData);
    }
  }, [initialData, reset]);

  const onSubmitHandler: SubmitHandler<IBooking> = async data => {
    // Format startTime and endTime hh:mm:ss
    data.endTime = data.endTime ? formatTime(data.endTime) : undefined;
    data.startTime = formatTime(data.startTime);
    data.status = Number(data.status);
    await onSubmit(data);
    reset();
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`; // Add seconds
  };

  return (
    <div className='card'>
      <div className='card-header flex justify-between'>
        <h3>{mode === 'add' ? 'Add Booking' : 'Edit Booking'}</h3>
        <button aria-label='Close' title='Close' onClick={onClose}>
          <X width={20} height={20} />
        </button>
      </div>
      {errors.root && <div className='form-error'>{errors.root.message}</div>}
      <div className='card-body'>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormField
            label='Client'
            id='clientId'
            as='select'
            register={register('clientId')}
            error={errors.clientId}
            options={[
              {
                value: '',
                label: initialData?.clientId
                  ? clients.find(c => c.id === initialData?.clientId)?.firstName + ' ' + clients.find(c => c.id === initialData?.clientId)?.lastName
                  : 'Select Client',
              },
              ...clients
                .filter(c => c.id !== initialData?.clientId)
                .map(client => ({
                  value: client.id || '',
                  label: `${client.firstName} ${client.lastName}`,
                })),
            ]}
            defaultValue={initialData?.clientId || ''}
          />
          <FormField
            label='Service'
            id='serviceId'
            as='select'
            register={register('serviceId')}
            error={errors.serviceId}
            options={[
              {value: initialData?.serviceId || '', label: services.find(s => s.id === initialData?.serviceId)?.serviceName || 'Select Service'},
              ...services
                .filter(s => s.id !== initialData?.serviceId)
                .map(service => ({
                  value: service.id || '',
                  label: service.serviceName,
                })),
            ]}
            defaultValue={initialData?.serviceId || ''}
          />
          <FormField
            label='Booking Date'
            id='bookingDate'
            type='date'
            register={register('bookingDate')}
            error={errors.bookingDate}
            defaultValue={initialData?.bookingDate}
          />
          <FormField label='Start Time' id='startTime' type='time' register={register('startTime')} error={errors.startTime} />

          <FormField
            label='Status'
            id='status'
            as='select'
            register={register('status', {
              valueAsNumber: true,
            })}
            error={errors.status}
            options={[
              {value: EBookingStatus.Pending.toString(), label: 'Pending'},
              {value: EBookingStatus.Confirmed.toString(), label: 'Confirmed'},
              {value: EBookingStatus.Cancelled.toString(), label: 'Cancelled'},
            ]}
          />
          <div className='flex justify-end gap-4.5 pt-4'>
            <button onClick={onClose} className='form-button-secondary'>
              Cancel
            </button>
            <button disabled={isSubmitting} className='form-button-primary' type='submit'>
              {mode === 'add' ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;

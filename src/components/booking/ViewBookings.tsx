import {IBooking} from '@/interfaces/domain/IBooking';
import {EBookingStatus} from '@/interfaces/enums/EBookingStatus';
import AddEntityButton from '../ui/AddEntityButton';
import EditDeleteBtn from '../ui/form/editDeleteBtn';

interface IViewBookingsProps {
  bookings: IBooking[];
  onOpenBookingModal: () => void;
  onEdit: (booking: IBooking) => void;
  onDelete: (id: string) => void;
}

const ViewBookings: React.FC<IViewBookingsProps> = ({bookings, onOpenBookingModal, onEdit, onDelete}) => {
  return (
    <>
      <div className='flex w-full items-center justify-start align-middle'>
        <AddEntityButton onClick={onOpenBookingModal} entityType='Booking' />
      </div>

      <div className='relative'>
        {bookings.length > 0 ? (
          <div className='table-container'>
            <div className='max-w-full overflow-x-auto'>
              <table className='w-full table-auto'>
                <thead>
                  <tr className='table-header'>
                    <th className='min-w-[220px] p-4 font-medium xl:pl-11'>Client</th>
                    <th className='min-w-[220px] p-4 font-medium'>Service</th>
                    <th className='min-w-[150px] p-4 font-medium'>Booking Date</th>
                    <th className='min-w-[150px] p-4 font-medium'>Booking Time</th>
                    <th className='min-w-[150px] p-4 font-medium'>Booking Status</th>
                    <th className='p-4 font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, key) => (
                    <tr key={key} className={key === bookings.length - 1 ? 'last-serviceitem' : ''}>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11'>{booking.clientName}</td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>{booking.serviceName}</td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
                        {booking.startTime ? booking.startTime.substring(0, 5) : 'N/A'} - {booking.endTime ? booking.endTime.substring(0, 5) : 'N/A'}
                      </td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
                        <p
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                            booking.status === EBookingStatus.Confirmed
                              ? 'bg-success/10 text-success'
                              : booking.status === EBookingStatus.Cancelled
                                ? 'bg-danger/10 text-danger'
                                : 'bg-warning/10 text-warning'
                          }`}>
                          {booking.status === EBookingStatus.Confirmed ? 'Confirmed' : booking.status === EBookingStatus.Cancelled ? 'Cancelled' : 'Pending'}
                        </p>
                      </td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
                        <EditDeleteBtn onEdit={onEdit} onDelete={onDelete} entity={booking} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className='p-4 text-center text-gray-500'>No bookings available.</div>
        )}
      </div>
    </>
  );
};

export default ViewBookings;

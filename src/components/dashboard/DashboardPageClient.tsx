'use client';

import ServiceItem from '@/components/services/ServiceItem';
import useEntityActions from '@/hooks/base/useEntityActions';
import {useTurnoverData} from '@/hooks/bookings/useTurnoverData';
import {IBooking} from '@/interfaces/domain/IBooking';
import {IClient} from '@/interfaces/domain/IClient';
import {IService} from '@/interfaces/domain/IService';
import {BookingService} from '@/services/admin/BookingService';
import {ClientService} from '@/services/admin/ClientService';
import {ServiceService} from '@/services/admin/ServiceService';
import {useState} from 'react';
import {FiCalendar, FiDollarSign, FiPieChart, FiUsers} from 'react-icons/fi';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const DashboardPageClient = () => {
  const {entities: services, loading: servicesLoading, error: servicesError} = useEntityActions<IService>(ServiceService);
  const {entities: bookings, loading: bookingsLoading, error: bookingsError} = useEntityActions<IBooking>(BookingService);
  const {entities: clients, loading: clientsLoading, error: clientsError} = useEntityActions<IClient>(ClientService);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const {monthlyTurnover, totalTurnover, loading: turnoverLoading, error: turnoverError} = useTurnoverData(selectedServiceId);

  const handleSelectAll = () => {
    setSelectedServiceId(undefined); // Fetch all data
  };

  return (
    <>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Beauty Service Dashboard</h1>
      </div>

      {servicesLoading || bookingsLoading ? (
        <p>Loading data...</p>
      ) : servicesError || bookingsError || turnoverError || clientsError ? (
        <p className='form-error'>Error loading data</p>
      ) : (
        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <div className='card p-6'>
            <div className='flex items-center'>
              <FiUsers className='mr-4 size-8' />
              <div>
                <p className='text-sm font-medium text-body dark:text-bodydark'>Total Clients</p>
                <p className='text-2xl font-semibold'>{clients.length}</p>
              </div>
            </div>
          </div>
          <div className='card p-6'>
            <div className='flex items-center'>
              <FiCalendar className='mr-4 size-8' />
              <div>
                <p className='text-sm font-medium text-body dark:text-bodydark'>Appointments</p>
                <p className='text-2xl font-semibold'>{bookings.length}</p>
              </div>
            </div>
          </div>
          <div className='card p-6'>
            <div className='flex items-center'>
              <FiDollarSign className='mr-4 size-8' />
              <div>
                <p className='text-sm font-medium text-body dark:text-bodydark'>Revenue</p>
                <p className='text-2xl font-semibold'>{totalTurnover}</p>
              </div>
            </div>
          </div>
          <div className='card p-6'>
            <div className='flex items-center'>
              <FiPieChart className='mr-4 size-8' />
              <div>
                <p className='text-sm font-medium text-body dark:text-bodydark'>Services</p>
                <p className='text-2xl font-semibold'>{services.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2'>
        <div className='card p-6'>
          <h2 className='mb-4 text-xl font-semibold'>Revenue Overview</h2>

          <ResponsiveContainer width='100%' height={300}>
            <AreaChart data={monthlyTurnover || []}>
              <defs>
                <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey='month' tick={{fill: 'currentColor'}} axisLine={{stroke: 'currentColor'}} />
              <YAxis width={60} tick={{fill: 'currentColor'}} axisLine={{stroke: 'currentColor'}} />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip />
              <Area type='monotone' dataKey='revenue' stroke='#8884d8' fillOpacity={1} fill='url(#colorRevenue)' />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='card p-6'>
          <h2 className='mb-4 text-xl font-semibold'>Services</h2>
          <ul className='space-y-2'>
            <button
              onClick={handleSelectAll}
              className={`mb-2 cursor-pointer rounded p-3 transition duration-200 ${!selectedServiceId ? 'bg-blue-500 text-white' : 'bg-bodydark1 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'}`}>
              All Services
            </button>
            {services.map(service => (
              <ServiceItem key={service.id} service={service} onSelectService={setSelectedServiceId} isSelected={selectedServiceId === service.id} />
            ))}
          </ul>
        </div>
      </div>

      <div className='card p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Recent Appointments</h2>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='text-left'>
              <th className='pb-3'>Client</th>
              <th className='pb-3'>Service</th>
              <th className='pb-3'>Date</th>
              <th className='pb-3'>Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td className='py-2'>{booking.clientName}</td>
                <td className='py-2'>{booking.serviceName}</td>
                <td className='py-2'>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td className='py-2'>{booking.startTime ? booking.startTime.substring(0, 5) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardPageClient;

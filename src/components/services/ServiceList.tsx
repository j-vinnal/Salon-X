import {IService} from '@/interfaces/domain/IService';
import {Clock4, Edit, Trash} from 'lucide-react';

interface ServiceListProps {
  services?: IService[];
  onEdit: (service: IService) => void;
  onDelete: (id: string) => void;
  selectedService: IService | null;
}

const ServiceList: React.FC<ServiceListProps> = ({services, onEdit, onDelete, selectedService}) => {
  return (
    <section className='relative'>
      {services && services.length > 0 ? (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {services?.map(service => (
            <div
              key={service.id}
              className={`flex cursor-pointer flex-col justify-between rounded-lg border border-stroke bg-white p-6 shadow-sm transition duration-300 dark:border-strokedark dark:bg-gray-800 ${selectedService?.id === service.id ? 'ring-2 ring-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => onEdit(service)}>
              <div>
                <h3 className='mb-2 text-xl font-semibold dark:text-white'>{service.serviceName}</h3>
                <p className='mb-4 text-body dark:text-bodydark'>{service.description}</p>
              </div>

              <div className='flex items-center justify-between'>
                <p className='text-2xl font-semibold'>€{service.price}</p>

                <div className='flex items-center text-body dark:text-bodydark'>
                  <Clock4 className='mr-1' width={20} height={20} />
                  <p>{service.duration} min</p>
                </div>
              </div>

              <div className='mt-4 flex justify-end gap-3'>
                <button onClick={() => onEdit(service)} aria-label='Edit' title='Edit' className='hover:text-primary'>
                  <Edit width={20} height={20} />
                </button>
                <button onClick={() => onDelete(service.id!)} aria-label='Delete' title='Delete' className='hover:text-primary'>
                  <Trash width={20} height={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='p-4 text-center text-gray-500'>No services available.</div>
      )}
    </section>
  );
};

export default ServiceList;

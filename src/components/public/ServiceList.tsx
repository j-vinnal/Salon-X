import {IService} from '@/interfaces/domain/IService';
import {Clock4} from 'lucide-react';

interface ServiceListProps {
  services?: IService[];
  selectedService: IService | null;
  setSelectedService: (service: IService) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({services, selectedService, setSelectedService}) => {
  return (
    <section className='mb-12'>
      <h2 className='mb-8 text-center text-3xl font-bold'>Our Services</h2>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {services?.map(service => (
          <div
            key={service.id}
            className={`flex cursor-pointer flex-col justify-between rounded-lg border border-stroke bg-white p-6 shadow-sm transition duration-300 dark:border-strokedark dark:bg-gray-800 ${selectedService?.id === service.id ? 'ring-2 ring-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            onClick={() => setSelectedService(service)}>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceList;

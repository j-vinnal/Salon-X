import {IService} from '@/interfaces/domain/IService';
import React from 'react';

interface ServiceItemProps {
  service: IService;
  onSelectService: (id: string) => void;
  isSelected: boolean;
}

const ServiceItem = React.memo(({service, onSelectService, isSelected}: ServiceItemProps) => {
  return (
    <li
      className={`mb-2 cursor-pointer rounded p-3 transition duration-200 ${isSelected ? 'bg-blue-500 text-white' : 'bg-bodydark1 hover:bg-bodydark dark:bg-gray-700 dark:hover:bg-gray-600'}`}
      onClick={() => onSelectService(service.id!)}>
      {service.serviceName}
    </li>
  );
});

ServiceItem.displayName = 'ServiceItem';

export default ServiceItem;

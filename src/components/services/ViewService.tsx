'use client';

import {IService} from '@/interfaces/domain/IService';
import {EServiceStatus} from '@/interfaces/enums/EServiceStatus';
import EditDeleteBtn from '../ui/form/editDeleteBtn';

interface IViewServiceProps {
  onOpenServiceModal: () => void;
  services: IService[];
  onDelete: (id: string) => void;
  onEdit: (service: IService) => void;
}

const ViewService = ({onOpenServiceModal, services, onDelete, onEdit}: IViewServiceProps) => {
  return (
    <>
      <div className='relative'>
        {services.length > 0 ? (
          <div className='table-container'>
            <div className='max-w-full overflow-x-auto'>
              <table className='w-full table-auto'>
                <thead>
                  <tr className='table-header'>
                    <th className='min-w-[220px] p-4 font-medium xl:pl-11'>Service Name</th>
                    <th className='min-w-[220px] p-4 font-medium'>Description</th>
                    <th className='min-w-[150px] p-4 font-medium'>Status</th>
                    <th className='p-4 font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, key) => (
                    <tr key={key} className={key === services.length - 1 ? 'last-serviceitem' : ''}>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11'>
                        <h5 className='font-medium'>{service.serviceName}</h5>
                        <div className='flex justify-start gap-4 pt-4'>
                          <p className='text-sm text-body dark:text-bodydark'>€{service.price}</p>
                          <p className='text-sm text-body dark:text-bodydark'>{service.duration} min</p>
                        </div>
                      </td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>{service.description}</td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
                        <p
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                            service.status === EServiceStatus.Active ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                          }`}>
                          {service.status === EServiceStatus.Active ? 'Active' : 'Inactive'}
                        </p>
                      </td>

                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
                        <EditDeleteBtn onEdit={onEdit} onDelete={onDelete} entity={service} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className='p-4 text-center text-gray-500'>No services available.</div>
        )}
      </div>
    </>
  );
};

export default ViewService;

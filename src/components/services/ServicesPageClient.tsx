'use client';

import ServiceModal from '@/components/services/ServiceModal';
import ViewService from '@/components/services/ViewService';
import useServicesPage from '@/hooks/services/useServicesPage';
import {useState} from 'react';
import AddEntityButton from '../ui/AddEntityButton';
import ServiceList from './ServiceList';

const ServicesPageClient = () => {
  const {isModalOpen, modalMode, selectedService, entities, closeModal, openAddServiceModal, openEditServiceModal, handleDeleteService, handleFormSubmit} =
    useServicesPage();

  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex w-full items-center justify-between align-middle'>
        <AddEntityButton onClick={openAddServiceModal} entityType='Service' />
        <div className='flex gap-2'>
          <button
            onClick={() => setViewMode('table')}
            className={`flex justify-center rounded border border-stroke px-6 py-2 font-medium hover:shadow-1 dark:border-strokedark ${viewMode === 'table' ? 'ring-2 ring-blue-400' : ''}`}>
            Table
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex justify-center rounded border border-stroke px-6 py-2 font-medium hover:shadow-1 dark:border-strokedark ${viewMode === 'cards' ? 'ring-2 ring-blue-400' : ''}`}>
            Cards
          </button>
        </div>
      </div>
      {viewMode === 'table' ? (
        <ViewService onOpenServiceModal={openAddServiceModal} services={entities} onEdit={openEditServiceModal} onDelete={handleDeleteService} />
      ) : (
        <ServiceList services={entities} onEdit={openEditServiceModal} onDelete={handleDeleteService} selectedService={selectedService} />
      )}
      {isModalOpen && (
        <>
          <div className='fixed inset-0 z-40 bg-boxdark/70 dark:bg-meta-4/70' onClick={closeModal}></div>
          <div className='fixed inset-0 z-50 flex items-center justify-center' onClick={closeModal}>
            <div onClick={e => e.stopPropagation()} className='w-150'>
              <ServiceModal mode={modalMode} initialData={selectedService} onClose={closeModal} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesPageClient;

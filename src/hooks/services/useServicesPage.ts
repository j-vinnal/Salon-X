'use client';

import useEntityActions from '@/hooks/base/useEntityActions';
import {IService} from '@/interfaces/domain/IService';
import {ServiceService} from '@/services/admin/ServiceService';
import {ModalContext} from '@/states/contexts/ModalContext';
import {useContext, useState} from 'react';
import {toast} from 'react-toastify';

const useServicesPage = () => {
  const {isModalOpen, setIsModalOpen} = useContext(ModalContext)!;
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const {addEntity, editEntity, deleteEntity, entities, loading, error, refetch} = useEntityActions<IService>(ServiceService);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const openAddServiceModal = () => {
    setModalMode('add');
    setIsModalOpen(true);
  };

  const openEditServiceModal = (service: IService) => {
    setModalMode('edit');
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleAddService = async (service: IService) => {
    try {
      await addEntity(service);
      toast.success('Service added successfully!');
      refetch();
      closeModal();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleEditService = async (service: IService) => {
    if (selectedService?.id) {
      try {
        await editEntity(selectedService.id, service);
        toast.success('Service updated successfully!');
        refetch();
        closeModal();
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  const handleFormSubmit = async (service: IService) => {
    if (modalMode === 'add') {
      await handleAddService(service);
    } else {
      await handleEditService(service);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      await deleteEntity(serviceId);
      toast.success('Service deleted successfully!');
      refetch();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return {
    isModalOpen,
    modalMode,
    selectedService,
    entities,
    closeModal,
    openAddServiceModal,
    openEditServiceModal,
    handleDeleteService,
    handleFormSubmit,
  };
};

export default useServicesPage;

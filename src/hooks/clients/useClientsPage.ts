'use client';

import useEntityActions from '@/hooks/base/useEntityActions';
import {IClient} from '@/interfaces/domain/IClient';
import {ClientService} from '@/services/admin/ClientService';
import {ModalContext} from '@/states/contexts/ModalContext';
import {useContext, useState} from 'react';
import {toast} from 'react-toastify';

const useClientsPage = () => {
  const {isModalOpen, setIsModalOpen} = useContext(ModalContext)!;
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const {addEntity, editEntity, deleteEntity, entities, loading, error, refetch} = useEntityActions<IClient>(ClientService);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const openAddClientModal = () => {
    setModalMode('add');
    setIsModalOpen(true);
  };

  const openEditClientModal = (client: IClient) => {
    setModalMode('edit');
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleAddClient = async (client: IClient) => {
    try {
      await addEntity(client);
      toast.success('Client added successfully!');
      refetch();
      closeModal();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleEditClient = async (client: IClient) => {
    if (selectedClient?.id) {
      try {
        await editEntity(selectedClient.id, client);
        toast.success('Client updated successfully!');
        refetch();
        closeModal();
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  const handleFormSubmit = async (client: IClient) => {
    if (modalMode === 'add') {
      await handleAddClient(client);
    } else {
      await handleEditClient(client);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteEntity(clientId);
      toast.success('Client deleted successfully!');
      refetch();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return {
    isModalOpen,
    modalMode,
    selectedClient,
    entities,
    closeModal,
    openAddClientModal,
    openEditClientModal,
    handleDeleteClient,
    handleFormSubmit,
  };
};

export default useClientsPage;

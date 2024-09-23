'use client';

import ClientModal from '@/components/clients/ClientModal';
import ViewClients from '@/components/clients/ViewClients';
import useClientsPage from '@/hooks/clients/useClientsPage';

const ClientsPageClient = () => {
  const {isModalOpen, modalMode, selectedClient, entities, closeModal, openAddClientModal, openEditClientModal, handleDeleteClient, handleFormSubmit} =
    useClientsPage();

  return (
    <div className='flex flex-col gap-6'>
      <ViewClients clients={entities} onOpenClientModal={openAddClientModal} onEdit={openEditClientModal} onDelete={handleDeleteClient} />
      {isModalOpen && (
        <>
          <div className='fixed inset-0 z-40 bg-boxdark/70 dark:bg-meta-4/70' onClick={closeModal}></div>
          <div className='fixed inset-0 z-50 flex items-center justify-center' onClick={closeModal}>
            <div onClick={e => e.stopPropagation()} className='w-150'>
              <ClientModal mode={modalMode} initialData={selectedClient} onClose={closeModal} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientsPageClient;

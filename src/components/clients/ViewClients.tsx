import {IClient} from '@/interfaces/domain/IClient';
import AddEntityButton from '../ui/AddEntityButton';
import EditDeleteBtn from '../ui/form/editDeleteBtn';

interface IViewClientsProps {
  clients: IClient[];
  onOpenClientModal: () => void;
  onEdit: (client: IClient) => void;
  onDelete: (id: string) => void;
}

const ViewClients: React.FC<IViewClientsProps> = ({clients, onOpenClientModal, onEdit, onDelete}) => {
  return (
    <>
      <div className='flex w-full items-center justify-start align-middle'>
        <AddEntityButton onClick={onOpenClientModal} entityType='Client' />
      </div>

      <div className='relative'>
        {clients.length > 0 ? (
          <div className='table-container'>
            <div className='max-w-full overflow-x-auto'>
              <table className='w-full table-auto'>
                <thead>
                  <tr className='table-header'>
                    <th className='min-w-[220px] p-4 font-medium xl:pl-11'>Name</th>
                    <th className='min-w-[220px] p-4 font-medium'>Email</th>
                    <th className='min-w-[150px] p-4 font-medium'>Phone</th>
                    <th className='p-4 font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, key) => (
                    <tr key={key} className={key === clients.length - 1 ? 'last-serviceitem' : ''}>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11'>
                        {client.firstName} {client.lastName}
                      </td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>{client.email}</td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>{client.phoneNumber}</td>
                      <td className='border-b border-[#eee] px-4 py-5 dark:border-strokedark'>
                        <EditDeleteBtn onEdit={onEdit} onDelete={onDelete} entity={client} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className='p-4 text-center text-gray-500'>No clients available.</div>
        )}
      </div>
    </>
  );
};

export default ViewClients;

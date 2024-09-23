import {IService} from '@/interfaces/domain/IService';
import {IClient} from '@/interfaces/domain/IClient';
import {IBooking} from '@/interfaces/domain/IBooking';
import {Pencil, Trash} from 'lucide-react';
import { IBaseEntity } from '@/interfaces/domain/IBaseEntity';

interface EditDeleteBtnProps<T extends IBaseEntity> {
  onEdit: (entity: T) => void;
  onDelete: (id: string) => void;
  entity: T;
}

const EditDeleteBtn = <T extends IBaseEntity>({ onEdit, onDelete, entity }: EditDeleteBtnProps<T>) => {
  return (
    <div className='flex items-start gap-10'>
      <button onClick={() => onEdit(entity)} aria-label='Edit' title='Edit' className='hover:text-primary'>
        <Pencil width={20} height={20} color='currentColor' />
      </button>
      <button onClick={() => onDelete(entity.id!)} aria-label='Delete' title='Delete' className='hover:text-primary'>
        <Trash width={20} height={20} color='currentColor' />
      </button>
    </div>
  );
};

export default EditDeleteBtn;

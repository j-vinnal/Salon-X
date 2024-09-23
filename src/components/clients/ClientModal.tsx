import {ClientSchema, IClient} from '@/interfaces/domain/IClient';
import {zodResolver} from '@hookform/resolvers/zod';
import {Mail, Phone, UserRound, X} from 'lucide-react';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormField from '../ui/form/FormField';

interface IClientModalProps {
  mode: 'add' | 'edit';
  initialData: IClient | null;
  onClose: () => void;
  onSubmit: (client: IClient) => void;
}

const ClientModal: React.FC<IClientModalProps> = ({mode, initialData, onClose, onSubmit}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<IClient>({
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
    resolver: zodResolver(ClientSchema),
  });

  const onSubmitHandler: SubmitHandler<IClient> = async data => {
    await onSubmit(data);
    reset();
  };

  return (
    <div className='card'>
      <div className='card-header flex justify-between'>
        <h3>{mode === 'add' ? 'Add Client' : 'Edit Client'}</h3>
        <button aria-label='Close' title='Close' onClick={onClose}>
          <X width={20} height={20} />
        </button>
      </div>
      {errors.root && <div className='form-error'>{errors.root.message}</div>}
      <div className='card-body'>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className='flex flex-col sm:flex-row sm:gap-5.5'>
            <div className='w-full sm:w-1/2'>
              <FormField
                label='First Name'
                id='firstName'
                register={register('firstName')}
                error={errors.firstName}
                icon={<UserRound className='form-icon' />}
              />
            </div>

            <div className='w-full sm:w-1/2'>
              <FormField label='Last Name' id='lastName' register={register('lastName')} error={errors.lastName} />
            </div>
          </div>

          <FormField label='Email' id='email' register={register('email')} error={errors.email} icon={<Mail className='form-icon' />} />

          <FormField
            label='Phone Number'
            id='phoneNumber'
            register={register('phoneNumber')}
            error={errors.phoneNumber}
            icon={<Phone className='form-icon' />}
          />
          <div className='flex justify-end gap-4.5 pt-4'>
            <button onClick={onClose} className='form-button-secondary'>
              Cancel
            </button>
            <button disabled={isSubmitting} className='form-button-primary' type='submit'>
              {mode === 'add' ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;

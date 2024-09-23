'use client';

import {EditServiceSchema, IService} from '@/interfaces/domain/IService';
import {EServiceStatus} from '@/interfaces/enums/EServiceStatus';
import {CompanyContext} from '@/states/contexts/CompanyContext';
import {zodResolver} from '@hookform/resolvers/zod';
import {Euro, Hourglass, X} from 'lucide-react';
import React, {useContext, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormField from '../ui/form/FormField';
import StatusToggle from '../ui/form/StatusToggle';

interface IServiceModalProps {
  mode: 'add' | 'edit';
  initialData: IService | null;
  onClose: () => void;
  onSubmit: (service: IService) => void;
}

const ServiceModal: React.FC<IServiceModalProps> = ({mode, initialData, onClose, onSubmit}) => {
  const {company} = useContext(CompanyContext)!;
  const [isChecked, setIsChecked] = useState<boolean>(initialData?.status === EServiceStatus.Active);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
    setError,
  } = useForm<IService>({
    defaultValues: initialData || {
      serviceName: '',
      description: '',
      price: 0,
      duration: 0,
      status: EServiceStatus.Inactive,
      companyId: company?.id,
    },
    resolver: zodResolver(EditServiceSchema),
  });

  const onSubmitHandler: SubmitHandler<IService> = async data => {
    data.status = isChecked ? EServiceStatus.Active : EServiceStatus.Inactive;
    try {
      await onSubmit(data);
      reset();
    } catch (error: any) {
      setError('root', {type: 'server', message: 'Submission error'});
    }
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <div className='card'>
      <div className='card-header flex justify-between'>
        <h3>{mode === 'add' ? 'Add Service' : 'Edit Service'}</h3>
        <button aria-label='Close' title='Close' onClick={onClose}>
          <X width={20} height={20} />
        </button>
      </div>
      {errors.root && <div className='form-error'>{errors.root.message}</div>}
      <div className='card-body'>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormField label='Service Name' id='serviceName' register={register('serviceName')} error={errors.serviceName} />
          <FormField label='Description' id='description' register={register('description')} error={errors.description} as='textarea' />
          <FormField
            label='Price'
            id='price'
            type='number'
            register={register('price', {
              valueAsNumber: true,
            })}
            error={errors.price}
            icon={<Euro className='form-icon' />}
          />
          <FormField
            label='Duration'
            id='duration'
            type='number'
            register={register('duration', {
              valueAsNumber: true,
            })}
            error={errors.duration}
            icon={<Hourglass className='form-icon' />}
          />
          <StatusToggle isChecked={isChecked} handleChange={e => setIsChecked(e.target.checked)} label='Status' />
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

export default ServiceModal;

import { EditCompanySchema, ICompany } from '@/interfaces/domain/ICompany';
import { CompanyService } from '@/services/admin/CompanyService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useEntityActions from '../base/useEntityActions';
import { useContext } from 'react';
import { CompanyContext } from '@/states/contexts/CompanyContext';

const useCompanyForm = () => {
  const { addEntity, editEntity, entities: companies, refetch } = useEntityActions<ICompany>(CompanyService);
  const { setCompany, refetch: refetchCompanyContext } = useContext(CompanyContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    reset,
  } = useForm<ICompany>({
    resolver: zodResolver(EditCompanySchema),
  });

  const handleAddCompany = async (company: ICompany) => {
    try {
      const result: ICompany = await addEntity(company);
      toast.success('Company added successfully!');
      refetch();
      refetchCompanyContext(); // Refetch the company context
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', { type: 'server', message: (error as Error).message });
    }
  };

  const handleEditCompany = async (company: ICompany) => {
    try {
      const result: ICompany = await editEntity(companies[0].id!, company);
      toast.success('Company updated successfully!');
      refetch();
      refetchCompanyContext(); // Refetch the company context
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', { type: 'server', message: (error as Error).message });
    }
  };

  const handleFormSubmit = async (data: ICompany) => {
    if (companies.length === 0) {
      await handleAddCompany(data);
    } else {
      await handleEditCompany(data);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setError,
    setValue,
    reset,
    handleFormSubmit,
    companies,
    refetch,
  };
};

export default useCompanyForm;

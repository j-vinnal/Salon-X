'use client';

import FormField from '@/components/ui/form/FormField';
import LogoUploadForm from '@/components/ui/form/LogoUploadForm';
import useCompanyForm from '@/hooks/company/useCompanyForm';
import useFileUpload from '@/hooks/uploads/useFileUpload';
import {CompanyContext} from '@/states/contexts/CompanyContext';
import {Building2} from 'lucide-react';
import {useContext, useEffect} from 'react';

const CompanyForm = () => {
  const {company, setCompany} = useContext(CompanyContext)!;
  const {imagePreview, handleFileChange, logoPath} = useFileUpload();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const {register, handleSubmit, errors, isSubmitting, setValue, reset, handleFormSubmit, companies} = useCompanyForm();

  // Set form values to company data
  useEffect(() => {
    if (companies.length > 0) {
      const companyData = {
        companyName: companies[0].companyName || '',
        companyLogoPath: companies[0].companyLogoPath || '',
        publicUrl: companies[0].publicUrl || '',
        id: companies[0].id || undefined,
      };
      reset(companyData);
    }
  }, [companies, backendUrl, reset, setCompany]);

  // Set company logo path to form value after image upload
  useEffect(() => {
    if (logoPath) {
      setValue('companyLogoPath', logoPath, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [logoPath, setValue]);

  return (
    <>
      {errors.root && <div className='form-error'>{errors.root.message}</div>}
      <div className='card-body'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormField
            label='Company Name'
            id='companyName'
            register={register('companyName')}
            error={errors.companyName}
            icon={<Building2 className='form-icon' />}
          />

          <FormField label='Public URL' id='publicUrl' register={register('publicUrl')} error={errors.publicUrl} />

          <LogoUploadForm
            imagePreview={imagePreview}
            imageStyle='h-14 w-auto overflow-hidden'
            handleFileChange={handleFileChange}
            logoPath={company?.companyLogoPath}
            errors={errors.companyLogoPath && <div className='form-error'>{errors.companyLogoPath.message}</div>}
            label='Company Logo'
            placeholderContent={
              <>
                <Building2 className='form-icon' />
                <span className='pl-2'>Your logo</span>
              </>
            }
          />

          {/*buttons*/}
          <div className='flex justify-end gap-4.5 pt-4'>
            <button className='form-button-secondary'>Cancel</button>
            <button disabled={isSubmitting} className='form-button-primary' type='submit'>
              {companies.length === 0 ? 'Save' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyForm;

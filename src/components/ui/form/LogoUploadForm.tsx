import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface LogoUploadFormProps {
  imagePreview: string | undefined;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  logoPath: string | undefined;
  errors: React.ReactNode;
  label: string;
  placeholderContent: React.ReactNode;
  imageStyle?: string;
}

const LogoUploadForm = ({imagePreview, handleFileChange, errors, label, placeholderContent, logoPath, imageStyle}: LogoUploadFormProps) => (
  <>
    <div className='card-header'>
      <h3>{label}</h3>
    </div>
    <div className='flex items-center gap-3 py-4'>
      <div className={imageStyle}>
        {imagePreview ? (
          <Image src={imagePreview} width={112} height={112} alt='Logo' className='size-full object-cover' priority={true} />
        ) : logoPath ? (
          <Image src={logoPath!} width={112} height={112} alt='Logo' className='size-full object-cover' priority={true} />
        ) : (
          <div className='custom-border flex size-full items-center justify-center rounded-full px-6 py-2 font-medium'>{placeholderContent}</div>
        )}
      </div>
      <div>
        <h3>Upload photo</h3>
        <span className='flex gap-3.5'>
          <button disabled className='text-sm text-body hover:text-primary dark:text-bodydark'>
            Delete
          </button>
          <button disabled className='text-sm text-body hover:text-primary dark:text-bodydark'>
            Update
          </button>
        </span>
      </div>
    </div>
    <div
      id='FileUpload'
      className='relative mb-4 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-whiten p-4 dark:bg-boxdark sm:py-7.5'>
      <input
        onChange={handleFileChange}
        type='file'
        accept='image/*'
        className='absolute inset-0 z-50 m-0 size-full cursor-pointer p-0 opacity-0 outline-none'
      />

      <div className='flex flex-col items-center justify-center space-y-3'>
        <span className='custom-border flex size-10 items-center justify-center rounded-full'>
          <ArrowDown className='form-icon' />
        </span>

        <p>
          <span className='text-primary'>Click to upload</span> <span className='text-body dark:text-bodydark'>or drag and drop</span>
        </p>
        <p className='mt-1.5 text-body dark:text-bodydark'>BMP, PNG, JPG or GIF</p>
        <p className='text-body dark:text-bodydark'>(max, 800 X 800px)</p>
      </div>
      {errors}
    </div>
  </>
);

export default LogoUploadForm;

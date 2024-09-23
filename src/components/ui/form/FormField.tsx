import React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

interface FormFieldProps {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: {message?: string};
  type?: string;
  autoComplete?: string;
  icon?: React.ReactNode;
  as?: 'input' | 'textarea' | 'select';
  options?: {value: string; label: string}[];
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
}

const FormField: React.FC<FormFieldProps> = ({label, id, register, error, type = 'text', icon, autoComplete, as = 'input', options, defaultValue, value, onChange, required, name}) => (
  <div className='form-input-label'>
    <label htmlFor={id}>{label}</label>
    {as === 'select' ? (
      <select {...register} id={id} className='form-select' defaultValue={defaultValue}>
        {options?.map(option => (
          <option key={option.value} value={option.value} className='form-select-option'>
            {option.label}
          </option>
        ))}
      </select>
    ) : as === 'textarea' ? (
      <textarea {...register} id={id} rows={6} placeholder={`Enter ${label.toLowerCase()}`} className='form-textarea' />
    ) : (
      <div className='relative'>
        {icon && <span className='form-icon-left'>{icon}</span>}
        <input {...register} id={id} type={type} autoComplete={autoComplete} className={icon ? 'form-input-icon-left' : 'form-input'} value={value} onChange={onChange} required={required} 
        name={name ?? id} />
      </div>
    )}
    {error && <div className='form-error'>{error.message}</div>}
  </div>
);

export default FormField;

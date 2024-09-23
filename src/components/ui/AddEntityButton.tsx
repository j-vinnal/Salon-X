'use client';

import { useContext } from 'react';
import { CompanyContext } from '@/states/contexts/CompanyContext';
import Link from 'next/link';

interface AddEntityButtonProps {
  onClick: () => void;
  entityType: string;
}

const AddEntityButton = ({ onClick, entityType }: AddEntityButtonProps) => {
  const { company } = useContext(CompanyContext)!;

  return (
    <>
      {company ? (
        <button
          disabled={!company}
          onClick={onClick}
          className='flex justify-center rounded border border-stroke px-6 py-2 font-medium hover:shadow-1 dark:border-strokedark'>
          {`Add ${entityType}`}
        </button>
      ) : (
        <Link
          href='/settings/company'
          className='flex justify-center rounded border border-stroke px-6 py-2 font-medium hover:shadow-1 dark:border-strokedark'>
          Update company info to add {entityType}
        </Link>
      )}
    </>
  );
};

export default AddEntityButton;
'use client';

import CompanyForm from '@/components/settings/company/CompanyForm';
import WorkingHoursForm from '@/components/settings/company/WorkingHoursForm';
import {useState} from 'react';

const CompanyCard = () => {
  const [activeTab, setActiveTab] = useState<'companyForm' | 'workingHoursForm'>('companyForm');

  return (
    <div className='card'>
      <div className='card-header flex gap-8'>
        <h3 className={`cursor-pointer ${activeTab === 'companyForm' ? '' : 'text-body dark:text-bodydark'}`} onClick={() => setActiveTab('companyForm')}>
          Company Information
        </h3>
        <h3
          className={`cursor-pointer ${activeTab === 'workingHoursForm' ? '' : 'text-body dark:text-bodydark'}`}
          onClick={() => {
            setActiveTab('workingHoursForm');
          }}>
          Working Hours
        </h3>
      </div>

      {activeTab === 'companyForm' ? <CompanyForm /> : <WorkingHoursForm />}
    </div>
  );
};

export default CompanyCard;

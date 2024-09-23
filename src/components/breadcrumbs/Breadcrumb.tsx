'use client';

import {JWTContext} from '@/states/contexts/JWTContext';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useContext} from 'react';


const Breadcrumb = () => {
  const pathname = usePathname();
  const {jwtResponse} = useContext(JWTContext)!;

  const lastPath = jwtResponse
    ? pathname.split('/').pop()?.trim() || 'home'
    : pathname.split('/').pop()?.trim() || 'signin';

  return (
    <div className=''>
     

      <nav>
        <ol className='flex items-center gap-1'>
          <li>
            <Link className='font-medium text-body dark:text-bodydark' href='/'>
              {jwtResponse ? 'Dashboard /' : ' /'}
            </Link>
          </li>
          <li className='font-medium capitalize text-primary'>{lastPath}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;

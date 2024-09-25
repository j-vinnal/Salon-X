'use client';

import Breadcrumb from '@/components/breadcrumbs/Breadcrumb';
import DarkModeSwitcher from '@/components/nav/header/DarkModeSwitcher';

import HamburgerToggle from '@/components/nav/header/HamburgerToggle';
import {JWTContext} from '@/states/contexts/JWTContext';
import {ModalContext} from '@/states/contexts/ModalContext';
import {useContext} from 'react';
import DropdownUser from './DropdownUser';

const Header = (props: {sidebarOpen: boolean; setSidebarOpen: (arg0: boolean) => void}) => {
  const {jwtResponse} = useContext(JWTContext)!;
  const {isModalOpen} = useContext(ModalContext)!;

  return (
    <header className='h-20 flex-none'>
      <div className='flex h-full grow items-center justify-between'>

      {jwtResponse?.jwt && 
        <div className='pr-2 lg:hidden'>
          <HamburgerToggle sidebarOpen={props.sidebarOpen} setSidebarOpen={props.setSidebarOpen} />
        </div>
      }

        <div className='flex w-full'>
          <Breadcrumb />
        </div>

        <div className='flex items-center gap-3 2xsm:gap-7'>
          <ul className='flex items-center gap-2 2xsm:gap-4'>
            <DarkModeSwitcher />
          </ul>

          {/* <!-- User Area --> */}
          {jwtResponse?.jwt && <DropdownUser navIsVisible={!isModalOpen} />}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

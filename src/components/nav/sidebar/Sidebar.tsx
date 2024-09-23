import {ArrowDownUp} from '@/components/_icons/sidebar/ArrowDownUp';
import SidebarLinkGroup from '@/components/nav/sidebar/SidebarLinkGroup';
import useEditAccount from '@/hooks/identity/useAccountActions';
import {CompanyContext} from '@/states/contexts/CompanyContext';
import {JWTContext} from '@/states/contexts/JWTContext';
import {ArrowLeft, Building2, Globe, KeyRound, LayoutDashboard, List, LogOut, Settings, UserRound} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useContext, useEffect, useRef, useState} from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
  const {jwtResponse} = useContext(JWTContext)!;
  const {company} = useContext(CompanyContext)!;
  const {logoutAccount} = useEditAccount();

  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = 'true';

  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({target}: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({key}: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`fixed z-50 h-full w-72.5 text-white duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='flex items-center justify-between gap-2 px-4 py-5 lg:px-6'>
        <div className='flex flex-col items-end'>
          <h1 className='mb-0 pl-2 text-white'>{company?.companyName}</h1>
        </div>

        <button ref={trigger} onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls='sidebar' aria-expanded={sidebarOpen} className='block lg:hidden'>
          <ArrowLeft width='20' height='18' />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className='flex flex-col overflow-y-auto duration-300 ease-linear'>
        {/* <!-- Sidebar Menu --> */}
        <nav className='mt-5 p-4 lg:px-6'>
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className='mb-4 text-sm font-semibold'>MENU</h3>

            <ul className='mb-6 flex flex-col gap-1.5'>
              {/* <!-- Menu Item Dashboard --> */}

              <li>
                <Link
                  href='/'
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === '/' && 'bg-graydark dark:bg-meta-4'
                  }`}>
                  <LayoutDashboard width='18' height='18' />
                  Dashboard
                </Link>
              </li>

              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Settings --> */}
              <SidebarLinkGroup activeCondition={pathname === '/setting' || pathname.includes('setting')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href='/#'
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('settings') && 'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}>
                        <Settings height={18} width={18} />
                        Settings
                        <ArrowDownUp width={20} height={20} arrowUp={open} className='absolute right-4 top-1/2 -translate-y-1/2' />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div className={`overflow-hidden ${!open && 'hidden'}`}>
                        <ul className='mb-5.5 mt-4 flex flex-col gap-2.5 pl-6'>
                          <li>
                            <Link
                              href='/settings/profile'
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/settings/profile' && 'text-white'
                              }`}>
                              <UserRound height={18} width={18} />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='/settings/company'
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/settings/company' && 'text-white'
                              }`}>
                              <Building2 height={18} width={18} />
                              Company
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Settings --> */}

              {/* <!-- Menu Item Services --> */}

              <li>
                <Link
                  href='/services'
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('services') && 'bg-graydark dark:bg-meta-4'
                  }`}>
                  <List height={18} width={18} />
                  Services
                </Link>
              </li>

              {/* <!-- Menu Item Services --> */}

              {/* <!-- Menu Item Clients --> */}

              <li>
                <Link
                  href='/clients'
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === '/clients' && 'bg-graydark dark:bg-meta-4'
                  }`}>
                  <List height={18} width={18} />
                  Clients
                </Link>
              </li>

              {/* <!-- Menu Item Clients --> */}

              {/* <!-- Menu Item Bookings --> */}

              <li>
                <Link
                  href='/bookings'
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === '/bookings' && 'bg-graydark dark:bg-meta-4'
                  }`}>
                  <List height={18} width={18} />
                  Bookings
                </Link>
              </li>

              {/* <!-- Menu Item Bookings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className='mb-4 text-sm font-semibold'>OTHERS</h3>

            <ul className='mb-6 flex flex-col gap-1.5'>
              {/* <!-- Menu Item Public Site --> */}

              {company?.publicUrl && (
                <li>
                  <Link
                    href={'/' + company?.publicUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname === '/live' && 'bg-graydark dark:bg-meta-4'
                    }`}>
                    <Globe height={18} width={18} />
                    Public Site
                  </Link>
                </li>
              )}

              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup activeCondition={pathname === '/auth' || pathname.includes('auth')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href='#'
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/auth' || pathname.includes('auth')) && 'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}>
                        <KeyRound height={18} width={18} />
                        Authentication
                        <ArrowDownUp width={20} height={20} arrowUp={open} className='absolute right-4 top-1/2 -translate-y-1/2' />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div className={`overflow-hidden ${!open && 'hidden'}`}>
                        <ul className='mb-5.5 mt-4 flex flex-col gap-2.5 pl-6'>
                          {!jwtResponse ? (
                            <>
                              <li>
                                <Link
                                  href='/auth/signin'
                                  className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                    pathname === '/auth/signin' && 'text-white'
                                  }`}>
                                  Sign In
                                </Link>
                              </li>

                              <li>
                                <Link
                                  href='/auth/signup'
                                  className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                    pathname === '/auth/signup' && 'text-white'
                                  }`}>
                                  Sign Up
                                </Link>
                              </li>
                            </>
                          ) : (
                            <li>
                              <button
                                onClick={logoutAccount}
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                  pathname === '/auth/signup' && 'text-white'
                                }`}>
                                <LogOut height={18} width={18} />
                                Log Out
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

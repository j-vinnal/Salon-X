import {ArrowDownUp} from '@/components/_icons/sidebar/ArrowDownUp';
import useEditAccount from '@/hooks/identity/useAccountActions';
import {JWTContext} from '@/states/contexts/JWTContext';
import {UserContext} from '@/states/contexts/UserContext';
import {Building2, LogOut, UserRound} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useContext, useEffect, useRef, useState} from 'react';

interface IDropdownUserProps {
  navIsVisible: boolean;
}

const DropdownUser = (props: IDropdownUserProps) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {jwtResponse, setJwtResponse} = useContext(JWTContext)!;
  const {user, setUser} = useContext(UserContext)!;
  const {logoutAccount} = useEditAccount();

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({target}: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // close dropdown on scroll
  useEffect(() => {
    if (!props.navIsVisible && dropdownOpen) {
      setDropdownOpen(false);
    }
  }, [props.navIsVisible, dropdownOpen]);

  return (
    <div className='relative w-max'>
      <Link ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className='flex items-center gap-4' href='#'>
        <div className='hidden text-right lg:block'>
          <span className='block text-sm font-medium'>
            {user?.firstName} {user?.lastName}
          </span>
          <span className='block text-xs text-body dark:text-bodydark'>{user?.role}</span>
        </div>

        <div className='size-12 overflow-hidden rounded-full'>
          {user?.profilePicturePath ? (
            <Image width={64} height={64} src={user?.profilePicturePath} alt='User Profile Picture' className='size-full object-cover' />
          ) : (
            <div className='flex size-full items-center justify-center rounded-full border border-stroke bg-bodydark1 font-medium dark:border-strokedark dark:bg-gray-700'>
              {user?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <ArrowDownUp width={20} height={20} arrowUp={dropdownOpen} />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 z-9999 flex w-62.5 flex-col rounded-lg border border-stroke bg-white font-medium shadow-default transition-opacity duration-300 dark:border-strokedark dark:bg-boxdark dark:text-bodydark1 ${
          dropdownOpen ? 'block' : 'hidden'
        }`}>
        <ul className='flex flex-col border-b border-stroke px-4 pb-2 pt-4 dark:border-strokedark'>
          <li>
            <Link
              href='/settings/profile'
              className='group relative flex items-center gap-2.5 px-4 py-2 duration-300 ease-in-out hover:bg-bodydark1 dark:hover:bg-meta-4'>
              <UserRound height={18} width={18} />
              My Profile
            </Link>
          </li>

          <li>
            <Link
              href='/settings/company'
              className='group relative flex items-center gap-2.5 px-4 py-2 duration-300 ease-in-out hover:bg-bodydark1 dark:hover:bg-meta-4'>
              <Building2 height={18} width={18} />
              My Company
            </Link>
          </li>
        </ul>

        {jwtResponse && (
          <div className='px-4 pb-4 pt-2'>
            <button
              className='group relative flex w-full items-center gap-2.5 px-4 py-2 duration-300 ease-in-out hover:bg-bodydark1 dark:hover:bg-meta-4'
              onClick={logoutAccount}>
              <LogOut height={18} width={18} />
              Log Out
            </button>
          </div>
        )}
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;

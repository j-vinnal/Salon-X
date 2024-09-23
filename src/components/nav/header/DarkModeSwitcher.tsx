'use client';

import {Moon} from '@/components/_icons/header/Moon';
import {Sun} from '@/components/_icons/header/Sun';
import {useEffect, useState} from 'react';

const DarkModeSwitcher = () => {
  const size = 18;
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

  const SwitchMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('darkMode', 'true');
      document.documentElement.classList.add('dark');
    } else if (darkMode === false) {
      localStorage.setItem('darkMode', 'false');
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, [darkMode]);

  return (
    <label className='relative m-0 block h-7.5 w-14 rounded-full bg-bodydark1 dark:bg-gray-700'>
      <input type='checkbox' onChange={SwitchMode} className='absolute top-0 z-50 m-0 size-full cursor-pointer opacity-0' />
      <span
        className={`absolute left-[3px] top-1/2 flex size-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher transition duration-75 ease-linear ${
          darkMode && '!right-[3px] !translate-x-full'
        }`}>
        <span className='dark:hidden'>
          <Sun width={size} height={size} />
        </span>
        <span className='hidden dark:inline-block'>
          <Moon width={size} height={size} />
        </span>
      </span>
    </label>
  );
};

export default DarkModeSwitcher;

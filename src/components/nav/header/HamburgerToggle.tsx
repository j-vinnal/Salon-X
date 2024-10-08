import React from 'react';

interface HamburgerToggleProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const HamburgerToggle: React.FC<HamburgerToggleProps> = ({sidebarOpen, setSidebarOpen}) => (
  <button
    className='rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark'
    onClick={() => setSidebarOpen(!sidebarOpen)}>
    <span className='relative block size-5 cursor-pointer'>
      <span className='absolute right-0 size-full'>
        <span
          className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
            !sidebarOpen && '!w-full delay-300'
          }`}></span>
        <span
          className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
            !sidebarOpen && '!w-full delay-500'
          }`}></span>
        <span
          className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
            !sidebarOpen && '!w-full delay-500'
          }`}></span>
      </span>
      <span className='absolute right-0 size-full rotate-45'>
        <span
          className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
            !sidebarOpen && '!h-0 !delay-[0]'
          }`}></span>
        <span
          className={`absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black delay-500 duration-200 ease-in-out dark:bg-white ${
            !sidebarOpen && '!h-0 !delay-200'
          }`}></span>
      </span>
    </span>
  </button>
);

export default HamburgerToggle;

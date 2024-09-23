import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className='mx-auto w-full items-end justify-end md:flex xl:justify-between'>
        <span className='hidden text-sm text-body dark:text-bodydark sm:text-center xl:block'>© 2024 Taltech. All Rights Reserved.</span>
        <div>
          <ul className='flex flex-wrap items-center text-sm font-medium text-body dark:text-bodydark sm:mt-0'>
            <li>
              <Link
                href='./about'
                className='me-4 text-body no-underline duration-300 ease-in-out hover:text-blue-600 dark:text-bodydark hover:dark:text-blue-600 md:me-6'>
                About
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='me-4 text-body no-underline duration-300 ease-in-out hover:text-blue-600 dark:text-bodydark hover:dark:text-blue-600 md:me-6'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='me-4 text-body no-underline duration-300 ease-in-out hover:text-blue-600 dark:text-bodydark hover:dark:text-blue-600 md:me-6'>
                Licensing
              </Link>
            </li>
            <li>
              <Link href='' className='text-body no-underline duration-300 ease-in-out hover:text-blue-600 dark:text-bodydark hover:dark:text-blue-600 md:me-6'>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

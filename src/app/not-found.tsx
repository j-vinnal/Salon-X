function NotFoundPage() {
  return (
    <>
      <div className='min-h-full p-4 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
        <div className='mx-auto max-w-max'>
          <div className='mt-5'>
            <div className='mt-6 flex'>
              <p className='text-4xl font-extrabold text-blue-600 sm:text-5xl'>Oops</p>
              <div className='ml-6'>
                <div className='border-l border-gray-500 pl-6'>
                  <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>Something went wrong!</h2>
                  <p className='mt-1 text-lg text-gray-500 dark:text-white'>Please select a topic from the tag cloud above or go back home.</p>
                </div>
                <div className='mt-10 flex space-x-3 sm:pl-6'>
                  <a
                    href='/'
                    className='inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-4 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                    Go back home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;

import {AuthIcon} from '../_icons/auth/AuthIcon';

const InfoSection = () => {
  return (
    <div className='hidden w-full xl:block'>
      <div className='flex h-full flex-col items-center justify-center px-26 py-17.5 text-center'>
        <span className='mt-15 inline-block'>
          <AuthIcon width={350} height={350} />
        </span>
      </div>
    </div>
  );
};

export default InfoSection;

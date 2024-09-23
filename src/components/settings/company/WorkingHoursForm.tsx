import StatusToggle from '@/components/ui/form/StatusToggle';
import useWorkingHoursForm from '@/hooks/workinghours/useWorkingHoursForm';
import {EDayOfWeek} from '@/interfaces/enums/EDayOfWeek';

const daysOfWeek = [
  EDayOfWeek.Monday,
  EDayOfWeek.Tuesday,
  EDayOfWeek.Wednesday,
  EDayOfWeek.Thursday,
  EDayOfWeek.Friday,
  EDayOfWeek.Saturday,
  EDayOfWeek.Sunday,
];

const generate15MinIntervals = () => {
  const intervals = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      intervals.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
  }
  return intervals;
};

const WorkingHoursForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isBusinessHoursEnabled,
    isActiveStatus,
    timeValues,
    handleBusinessHoursChange,
    handleDayChange,
    handleCustomTimeChange,
    handleFormSubmit,
  } = useWorkingHoursForm();

  const intervals = generate15MinIntervals();

  return (
    <div>
      {errors.root && <div className='form-error'>{errors.root.message}</div>}

      <div className='card-body'>
        <div className='form-input-label'>
          <h2>Business hours</h2>
        </div>

        <div className='flex justify-between'>
          <p className='pt-2 text-sm'>Enable or disable business working hours for all weekly working days</p>
          <StatusToggle isChecked={isBusinessHoursEnabled} handleChange={handleBusinessHoursChange} showLabels={false} />
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='card-body'>
            {daysOfWeek.map(day => (
              <div key={day} className='mb-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>{EDayOfWeek[day]}</div>
                  <div className='flex items-center gap-4'>
                    <input
                      id={EDayOfWeek[day].toString()}
                      name={EDayOfWeek[day].toString()}
                      type='checkbox'
                      checked={isActiveStatus[EDayOfWeek[day]]}
                      onChange={handleDayChange}
                      className='size-5 rounded-lg text-primary focus:ring-primary/90'
                    />
                    <select
                      name={`${EDayOfWeek[day]}-startTime`}
                      value={timeValues[EDayOfWeek[day]].start}
                      onChange={e => handleCustomTimeChange(EDayOfWeek[day], 'start', e.target.value)}
                      disabled={!isActiveStatus[EDayOfWeek[day]]}
                      className='mb-0 border-stroke bg-transparent text-black dark:border-form-strokedark dark:text-whiten'>
                      {intervals.map(interval => (
                        <option className='bg-transparent text-black dark:bg-meta-4 dark:text-whiten' key={interval} value={interval}>
                          {interval}
                        </option>
                      ))}
                    </select>
                    -
                    <select
                      name={`${EDayOfWeek[day]}-endTime`}
                      value={timeValues[EDayOfWeek[day]].end}
                      onChange={e => handleCustomTimeChange(EDayOfWeek[day], 'end', e.target.value)}
                      disabled={!isActiveStatus[EDayOfWeek[day]]}
                      className='mb-0 border-stroke bg-transparent text-black dark:border-form-strokedark dark:text-whiten'>
                      {intervals.map(interval => (
                        <option className='bg-transparent text-black dark:bg-meta-4 dark:text-whiten' key={interval} value={interval}>
                          {interval}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-end gap-4.5'>
            <button className='form-button-secondary'>Cancel</button>
            <button disabled={isSubmitting} className='form-button-primary' type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkingHoursForm;

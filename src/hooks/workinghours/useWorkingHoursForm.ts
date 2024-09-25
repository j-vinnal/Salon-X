import {IWorkingHour} from '@/interfaces/domain/IWorkingHour';
import {EDayOfWeek} from '@/interfaces/enums/EDayOfWeek';
import {CompanyContext} from '@/states/contexts/CompanyContext';
import {JWTContext} from '@/states/contexts/JWTContext';
import {useContext, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import { WorkingHourService } from '@/services/admin/WorkinghourService';
import useEntityActions from '../base/useEntityActions';

const useWorkingHoursForm = () => {
  const {jwtResponse} = useContext(JWTContext)!;
  const {company} = useContext(CompanyContext)!;
  const {addEntity, editEntity, entities: workingHours, refetch} = useEntityActions<IWorkingHour>(WorkingHourService);

  const [isBusinessHoursEnabled, setIsBusinessHoursEnabled] = useState(false);

  const [isActiveStatus, setIsActiveStatus] = useState<{[key: string]: boolean}>({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const [timeValues, setTimeValues] = useState<{[key: string]: {start: string; end: string}}>({
    Monday: {start: '09:00', end: '18:00'},
    Tuesday: {start: '09:00', end: '18:00'},
    Wednesday: {start: '09:00', end: '18:00'},
    Thursday: {start: '09:00', end: '18:00'},
    Friday: {start: '09:00', end: '18:00'},
    Saturday: {start: '09:00', end: '18:00'},
    Sunday: {start: '09:00', end: '18:00'},
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<IWorkingHour>({
    defaultValues: {
      companyId: company?.id!,
    },
    // resolver: zodResolver(EditWorkingHourSchema),
  });

  useEffect(() => {
    if (jwtResponse) {
      const newTimeValues = {...timeValues};
      const newIsActiveStatus = {...isActiveStatus};

      workingHours.forEach(wh => {
        const dayName = EDayOfWeek[wh.dayOfWeek];
        newTimeValues[dayName] = {
          start: wh.startTime!.slice(0, 5),
          end: wh.endTime!.slice(0, 5),
        };
        newIsActiveStatus[dayName] = wh.isActive!;
      });

      setTimeValues(newTimeValues);
      setIsActiveStatus(newIsActiveStatus);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtResponse, workingHours]);

  const handleBusinessHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsBusinessHoursEnabled(isChecked);

    const updatedStatus = Object.keys(isActiveStatus).reduce(
      (acc, day) => {
        acc[day] = isChecked;
        return acc;
      },
      {} as {[key: string]: boolean}
    );

    setIsActiveStatus(updatedStatus);

    if (isChecked) {
      setTimeValues({
        Monday: {start: '09:00', end: '18:00'},
        Tuesday: {start: '09:00', end: '18:00'},
        Wednesday: {start: '09:00', end: '18:00'},
        Thursday: {start: '09:00', end: '18:00'},
        Friday: {start: '09:00', end: '18:00'},
        Saturday: {start: '09:00', end: '18:00'},
        Sunday: {start: '09:00', end: '18:00'},
      });
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    setIsActiveStatus(prevStatus => ({
      ...prevStatus,
      [name]: checked,
    }));
  };

  const handleCustomTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setTimeValues(prevValues => ({
      ...prevValues,
      [day]: {
        ...prevValues[day],
        [type]: value,
      },
    }));
  };

  const convertToTimeSpan = (time: string) => `${time}:00`;

  const handleAddWorkingHours = async (workingHourData: IWorkingHour[]) => {
    try {
      const promises = workingHourData.map(async dayData => {
        const response = await addEntity(dayData);
        return response;
      });

      await Promise.all(promises);
      toast.success('Working hours added successfully!');
      refetch();
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', {type: 'server', message: (error as Error).message});
    }
  };

  const handleEditWorkingHours = async (workingHourData: IWorkingHour[]) => {
   
    try {
      const promises = workingHourData.map(async dayData => {
        const existing = workingHours.find(wh => wh.dayOfWeek === dayData.dayOfWeek);
        if (existing) {
          const response = await editEntity(existing.id!, dayData);
          return response;
        }
      });

      await Promise.all(promises);
      toast.success('Working hours updated successfully!');
      refetch();
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', {type: 'server', message: (error as Error).message});
    }
  };

  const handleFormSubmit: SubmitHandler<IWorkingHour> = async data => {
    const workingHourData = Object.keys(timeValues).map(day => ({
      id: workingHours.find(wh => wh.dayOfWeek === EDayOfWeek[day as keyof typeof EDayOfWeek])?.id,
      dayOfWeek: EDayOfWeek[day as keyof typeof EDayOfWeek],
      startTime: convertToTimeSpan(timeValues[day].start),
      endTime: convertToTimeSpan(timeValues[day].end),
      isActive: isActiveStatus[day],
      companyId: company?.id!,
    }));

    const existingWorkingHours = workingHourData.filter(wh => wh.id);
    const newWorkingHours = workingHourData.filter(wh => !wh.id);

    if (newWorkingHours.length > 0) {
      await handleAddWorkingHours(newWorkingHours);
    }

    if (existingWorkingHours.length > 0) {
      await handleEditWorkingHours(existingWorkingHours);
    }
  };

  return {
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
    setValue,
  };
};

export default useWorkingHoursForm;

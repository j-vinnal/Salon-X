import {MonthlyRevenue} from '@/interfaces/MonthlyRevenue';
import {BookingService} from '@/services/admin/BookingService';
import {JWTContext} from '@/states/contexts/JWTContext';
import {checkJwtAndHandleError} from '@/utils/checkJwtAndHandleError';
import {handleResponseErrors} from '@/utils/handleResponseErrors';
import {useContext, useEffect, useState, useCallback} from 'react';

export const useTurnoverData = (serviceId?: string) => {
  const {jwtResponse, setJwtResponse} = useContext(JWTContext)!;
  const [totalTurnover, setTotalTurnover] = useState<number | null>(null);
  const [monthlyTurnover, setMonthlyTurnover] = useState<MonthlyRevenue[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      checkJwtAndHandleError(jwtResponse);
      const bookingService = new BookingService(setJwtResponse);

      const [totalResponse, monthlyResponse] = await Promise.all([
        bookingService.getTotalTurnover(jwtResponse!, serviceId),
        bookingService.getMonthlyTurnover(jwtResponse!, serviceId),
      ]);

      handleResponseErrors(monthlyResponse);
      handleResponseErrors(totalResponse);

      setTotalTurnover(totalResponse.data ?? null);
      setMonthlyTurnover(monthlyResponse.data ?? null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [jwtResponse, setJwtResponse, serviceId]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {totalTurnover, monthlyTurnover, loading, error};
};

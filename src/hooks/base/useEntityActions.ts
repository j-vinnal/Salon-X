import {IBaseEntity} from '@/interfaces/domain/IBaseEntity';
import {JWTContext} from '@/states/contexts/JWTContext';
import {checkJwtAndHandleError} from '@/utils/checkJwtAndHandleError';
import {handleResponseErrors} from '@/utils/handleResponseErrors';
import {useContext, useEffect, useState, useCallback} from 'react';

const useEntityActions = <T extends IBaseEntity>(ServiceClass: any, isPublic: boolean = false) => {
  const {jwtResponse, setJwtResponse} = useContext(JWTContext)!;
  const [entities, setEntities] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addEntity = async (entity: T) => {
    setLoading(true);
    const service = new ServiceClass(setJwtResponse);
    try {
      let response;
      if (isPublic) {
        response = await service.postRequestPublic(entity, jwtResponse!);
      } else {
        checkJwtAndHandleError(jwtResponse);
        response = await service.postRequest(entity, jwtResponse!);
      }
      handleResponseErrors(response);
      return response.data;
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const editEntity = async (id: string, entity: T) => {
    setLoading(true);
    const service = new ServiceClass(setJwtResponse);
    try {
      checkJwtAndHandleError(jwtResponse);
      const response = await service.putRequest(id, entity, jwtResponse!);
      handleResponseErrors(response);
      return response.data;
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntity = async (id: string) => {
    setLoading(true);
    const service = new ServiceClass(setJwtResponse);
    try {
      checkJwtAndHandleError(jwtResponse);
      const response = await service.deleteRequest(id, jwtResponse!);
      handleResponseErrors(response);
      return response.data;
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEntity = useCallback(async () => {
 
    setLoading(true);
    const service = new ServiceClass(setJwtResponse);
    try {
      checkJwtAndHandleError(jwtResponse);

      const response = await service.getRequest(jwtResponse!);
      handleResponseErrors(response);
      setEntities(response.data || []);
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setJwtResponse, ServiceClass, jwtResponse]);

  useEffect(() => {
    if (jwtResponse && !isPublic) {
      fetchEntity();
    }
  }, [jwtResponse, setJwtResponse, isPublic, fetchEntity]);

  return {addEntity, editEntity, deleteEntity, entities, loading, error, refetch: fetchEntity};
};

export default useEntityActions;

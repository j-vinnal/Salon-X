import {IUploadImageRequest} from '@/interfaces/IUploadImageRequest';
import {ImageUploadService} from '@/services/admin/ImageUploadService';
import {JWTContext} from '@/states/contexts/JWTContext';
import {checkJwtAndHandleError} from '@/utils/checkJwtAndHandleError';
import {handleResponseErrors} from '@/utils/handleResponseErrors';
import {useContext, useState} from 'react';

const useFileUpload = () => {
  const {jwtResponse} = useContext(JWTContext)!;
  const [logoPath, setLogoPath] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUploadService = new ImageUploadService();
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      try {
        checkJwtAndHandleError(jwtResponse);
        const request: IUploadImageRequest = {image: e.target.files!};
        const response = await imageUploadService.uploadImage(request, jwtResponse!);
        handleResponseErrors(response);
        if (response.data) {
          setLogoPath(response.data.imagePath);
        }
        return response.data;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }
  };

  return {imagePreview, handleFileChange, logoPath};
};

export default useFileUpload;

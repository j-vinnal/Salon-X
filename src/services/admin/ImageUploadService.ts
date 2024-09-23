import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {IUploadImageRequest} from '@/interfaces/IUploadImageRequest';
import {IResultObject} from '@/interfaces/auth/IResultObject';
import {toFormData} from '@/utils/formData';
import {BaseService} from '../base/BaseService';

export class ImageUploadService extends BaseService {
  constructor() {
    super('v1/admin/imageUpload');
  }

  // Upload method
  async uploadImage(data: IUploadImageRequest, jwtData: IJWTResponse): Promise<IResultObject<{imagePath: string}>> {
    try {
      const formData = toFormData(data);

      const response = await this.axios.post<{imagePath: string}>('', formData, {
        headers: {
          Authorization: 'Bearer ' + jwtData.jwt,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }
}

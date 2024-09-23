import {z, ZodType} from 'zod';

export interface IUploadImageRequest {
  image?: FileList;
}

export const UploadImageSchema = z.object({
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      fileList => {
        if (!fileList || fileList.length === 0) return true; // If image is not provided, it's valid.
        const file = fileList[0];
        return file.size <= 800 * 800;
      },
      {
        message: 'Max file size is 800x800px',
        path: ['profilePicture'],
      }
    )
    .refine(
      fileList => {
        if (!fileList || fileList.length === 0) return true; // If image is not provided, it's valid.
        const file = fileList[0];
        return ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(
          file.type
        );
      },
      {
        message: 'Only .jpeg, .png, .gif, .bmp formats are supported.',
        path: ['profilePicture'],
      }
    ),
}) satisfies ZodType<IUploadImageRequest>;

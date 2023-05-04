import { MEDIA } from '@data/consts';
import { IMediaResponse } from '@types';
import { $authHost } from './index';

class MediaService {
  static async upload(
    media: FormData,
    folder?: string,
    setValue?: (val: number) => void
  ): Promise<IMediaResponse> {
    const { data } = await $authHost.post<IMediaResponse>(MEDIA, media, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: any) => {
        if (setValue) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setValue(Math.ceil(progress));
        }
      },
    });
    return data;
  }
}

export default MediaService;

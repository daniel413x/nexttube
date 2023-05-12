import { MOST_VIEWED, VIDEO } from '@data/consts';
import { IVideo, VideoGetResponse } from '@types';
import { $host } from './index';

class VideoService {
  static async getAll(): Promise<IVideo[]> {
    const { data } = await $host.get<VideoGetResponse>(VIDEO);
    return data[0];
  }

  static async getMostViewed(): Promise<IVideo[]> {
    const { data } = await $host.get<IVideo[]>(`${VIDEO}/${MOST_VIEWED}`);
    return data;
  }
}

export default VideoService;

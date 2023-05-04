import { MOST_VIEWED, VIDEO } from '@data/consts';
import { IVideo } from '@types';
import { $host } from './index';

class VideoService {
  static async getAll(): Promise<IVideo[]> {
    const { data } = await $host.get<IVideo[]>(VIDEO);
    return data;
  }

  static async getMostViewed(): Promise<IVideo[]> {
    const { data } = await $host.get<IVideo[]>(`${VIDEO}/${MOST_VIEWED}`);
    return data;
  }
}

export default VideoService;

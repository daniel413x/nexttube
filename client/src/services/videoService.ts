import { IVideo } from '@types';
import { $host } from './index';

class VideoService {
  static async getAll(): Promise<IVideo[]> {
    const { data } = await $host.get<IVideo[]>('video');
    return data;
  }

  static async getMostViewed(): Promise<IVideo[]> {
    const { data } = await $host.get<IVideo[]>('video/most-viewed');
    return data;
  }
}

export default VideoService;

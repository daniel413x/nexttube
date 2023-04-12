import { IVideo } from '@types';
import { $authHost, $host } from './index';

export const getAll = async (): Promise<IVideo[]> => {
  const { data } = await $authHost.post<IVideo[]>('video');
  return data;
};

export const getMostViewed = async (): Promise<IVideo[]> => {
  const { data } = await $host.post<IVideo[]>('video/most-viewed');
  return data;
};

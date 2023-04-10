import { IAuthData, IUser } from '@types';
import { $authHost, $host } from './index';

export const getAll = async (): Promise<IUser[]> => {
  const { data } = await $authHost.post<IUser[]>('user');
  return data;
};

export const getOne = async (id: string): Promise<IAuthData> => {
  const { data } = await $host.post<IAuthData>(`user/by-id/${id}`, {
    id,
  });
  return data;
};

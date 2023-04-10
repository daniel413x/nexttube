import { IAuthData } from '@types';
import { $host } from './index';

export const registration = async (
  email: string,
  password: string
): Promise<IAuthData> => {
  const { data } = await $host.post<IAuthData>('auth/registration', {
    email,
    password,
  });
  // const user = handleNewToken(data.token);
  return data;
};

export const login = async (
  email: string,
  password: string
): Promise<IAuthData> => {
  const { data } = await $host.post<IAuthData>('auth/login', {
    email,
    password,
  });
  // const user = handleNewToken(data.token);
  return data;
};

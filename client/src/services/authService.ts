import { AUTH, REGISTER } from '@data/consts';
import { IAuthData } from '@types';
import { $host } from './index';

class AuthService {
  static async registration(
    email: string,
    password: string
  ): Promise<IAuthData> {
    const { data } = await $host.post<IAuthData>(`${AUTH}/${REGISTER}`, {
      email,
      password,
    });
    return data;
  }

  static async login(email: string, password: string): Promise<IAuthData> {
    const { data } = await $host.post<IAuthData>('auth/login', {
      email,
      password,
    });
    return data;
  }
}

export default AuthService;

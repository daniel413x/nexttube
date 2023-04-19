import { AUTH, LOGIN, REGISTER } from '@data/consts';
import { IAuthData } from '@types';
import { $host } from './index';

class AuthService {
  static async registration(
    username: string,
    password: string
  ): Promise<IAuthData> {
    const { data } = await $host.post<IAuthData>(`/${AUTH}/${REGISTER}`, {
      username,
      password,
    });
    return data;
  }

  static async login(
    usernameOrEmail: string,
    password: string
  ): Promise<IAuthData> {
    const { data } = await $host.post<IAuthData>(`/${AUTH}/${LOGIN}`, {
      usernameOrEmail,
      password,
    });
    return data;
  }
}

export default AuthService;

import { IUser } from '@types';
import { $host } from './index';

class UserService {
  static async getOne(username: string): Promise<IUser> {
    const { data } = await $host.get<IUser>(`user/by-username/${username}`);
    return data;
  }

  static async getAll(): Promise<IUser[]> {
    const { data } = await $host.get<IUser[]>('user');
    return data;
  }
}

export default UserService;

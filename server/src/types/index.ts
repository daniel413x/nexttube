import { UserEntity } from 'src/db/user/user.entity';

export type PickOptional<T, K extends keyof T, O extends keyof T> = Pick<T, K> &
  Pick<Partial<T>, O>;

export type IUserDto = PickOptional<
  UserEntity,
  'email' | 'username' | 'description' | 'avatarPath',
  'password'
>;

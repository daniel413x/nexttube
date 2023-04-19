import { AuthSlice, IUser } from '@types';
import { GUEST } from './consts';

// eslint-disable-next-line import/prefer-default-export
export const initialUser: IUser = {
  username: 'Guest',
  email: '',
  flags: [GUEST],
  description: '',
  avatarPath: '',
  id: '',
  videos: [],
  subscribers: [],
  subscriptions: [],
  subscribersCount: 0,
};

export const initialAuth: AuthSlice = {
  loading: false,
  accessToken: '',
};

import { IInitialAuth, IUser } from '@types';
import { GUEST } from './consts';

// eslint-disable-next-line import/prefer-default-export
export const initialUser: IUser = {
  name: 'Guest',
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

export const initialAuth: IInitialAuth = {
  loading: false,
  user: null,
  accessToken: '',
};

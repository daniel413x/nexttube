import { IUser } from '@types';
import { GUEST } from './consts';

// eslint-disable-next-line import/prefer-default-export
export const GUEST_USER: IUser = {
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

import { AuthSlice, IUser, IVideo, UtilSlice } from '@types';
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

export const initialUtil: UtilSlice = {
  videoHeight: 100,
};

export const placeholderVideo: IVideo = {
  id: '',
  name: '',
  flags: [],
  viewsCount: 0,
  likes: 0,
  duration: 0,
  description: '',
  videoPath: '',
  user: initialUser,
  comments: [],
  thumbnailPath: '',
};

import { IUser } from "@/types";
import { GUEST } from "./consts";

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
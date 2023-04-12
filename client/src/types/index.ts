import { AppProps } from 'next/app';
import { NextPage } from 'next/types';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

type AuthStrings = 'guest' | 'registered' | 'admin';

interface IBaseProps {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVideo extends IBaseProps {
  name: string;
  flags: string[];
  views: number;
  likes: number;
  duration: number;
  description: string;
  videoPath: string;
  user: IUser;
  comments: IComment[];
  thumbnailPath: string;
}

export interface IVideoDto
  extends Pick<
    IVideo,
    'id' | 'thumbnailPath' | 'description' | 'name' | 'videoPath' | 'flags'
  > {}

export interface IUser extends IBaseProps {
  email: string;
  description: string;
  avatarPath: string;
  videos: IVideo[];
  name: string;
  flags: AuthStrings[];
  subscriptions: IUser[];
  subscribersCount: number;
  subscribers: ISubscription[];
}

export interface IComment extends IBaseProps {
  message: string;
  user: IUser;
  video: IVideo;
}

export interface ISubscription extends IBaseProps {
  toChannel: IUser;
}

export interface IMenuItem {
  href: string;
  title: string;
  Icon?: IconType;
  image?: string;
}

export interface IAuthData {
  user: Pick<IUser, 'id' | 'email'> | null;
  accessToken: string;
}

export interface IInitialAuth extends IAuthData {
  loading: boolean;
}

export interface IAuthFields {
  email: string;
  password: string;
}

export type ComponentAuthed = {
  auth: AuthStrings[];
};

export interface QueryResGetMultiple<T> {
  rows: T[];
  count: number;
}

export type Children = ReactNode | undefined;

export type NextPageAuthed<P = {}> = NextPage<P> & ComponentAuthed;

export type AppAuthed = AppProps & { Component: ComponentAuthed };

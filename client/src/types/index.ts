import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
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

export interface ICommentDto {
  message: Pick<IComment, 'message'>;
  videoId: string;
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
  accessToken: string;
}

export interface AuthSlice extends IAuthData {
  loading: boolean;
}

export type UserSlice = IUser;

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

export type ReduxQuery = UseQuery<
  QueryDefinition<
    any,
    BaseQueryFn<
      any | FetchArgs,
      any,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    any,
    any[],
    'api'
  >
>;

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
  viewsCount: number;
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

export interface IUserDto
  extends Pick<
    IUser,
    'id' | 'avatarPath' | 'description' | 'username' | 'flags'
  > {
  password?: string;
}

export interface IUser extends IBaseProps {
  email: string;
  description: string;
  avatarPath: string;
  videos: IVideo[];
  username: string;
  flags: string[];
  subscriptions: ISubscription[];
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

export interface IMediaResponse {
  name: string;
  url: string;
}

export interface ISubscription extends IBaseProps {
  toChannelId: string;
  toChannel: Pick<IUser, 'username' | 'avatarPath' | 'id'>;
  fromUserId: string;
  fromUser: IUser;
}

export interface IMenuItem {
  href: string;
  title: string;
  Icon?: IconType;
  image?: string;
}

export interface IVideoElement extends HTMLVideoElement {
  msRequestFullscreen?: () => void;
  mozRequestFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

export interface IAuthData {
  accessToken: string;
}

export interface IAuthFields {
  username: string;
  password: string;
}

export interface IHomeProps {
  newVideos: IVideo[];
  mostViewedVideo: IVideo;
  randomVideo: IVideo;
}

export interface IChannelProps {
  user: IUser;
}

export interface IVideoPageProps {
  video: IVideo;
}

export interface ITrendingProps {
  trendingVideos: IVideo[];
}

export interface AuthSlice extends IAuthData {
  loading: boolean;
}

export type UserSlice = IUser;

export type UtilSlice = {
  videoHeight: number;
  userDeletion: boolean;
};

export interface QueryResGetMultiple<T> {
  rows: T[];
  count: number;
}

export type Children = ReactNode | undefined;

export type SCSSModule = Record<string, string>;

export type ComponentAuthed = {
  auth: AuthStrings[];
};

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
    GetResponse<any>,
    'api'
  >
>;

export type VideoSearchQuery = {
  limit: number;
  page: number;
  searchTerm: string;
};

export type GetResponse<T> = [T[], number];

export type VideoGetResponse = GetResponse<IVideo>;

type ISerializedErrorResponse = {
  data?: any;
};

export interface ISerializedError {
  message?: string;
  response?: ISerializedErrorResponse;
}

import { createAction } from '@reduxjs/toolkit';
import { IVideo } from '@types';

export const setSearchResults = createAction<IVideo[]>('setSearchResults');

export const setSearchInput = createAction<string>('setSearchInput');

export const setDbCount = createAction<number>('setDbCount');

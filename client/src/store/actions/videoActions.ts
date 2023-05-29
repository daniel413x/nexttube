import { createAction } from '@reduxjs/toolkit';

export const setSearchInput = createAction<string>('setSearchInput');

export const setDbCount = createAction<number>('setDbCount');

import { createAction } from '@reduxjs/toolkit';

export const setVideoHeight = createAction<number>('setVideoHeight');

export const setUserDeletion = createAction<boolean>('setUserDeletion');

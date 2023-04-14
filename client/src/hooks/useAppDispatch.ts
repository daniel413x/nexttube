import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@store/rootReducer';
import type { AppDispatch } from '../store/configureStore';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

import { IUser } from '@types';
import { useAppSelector } from './useAppDispatch';

export default () => useAppSelector((state) => state.user) as IUser;

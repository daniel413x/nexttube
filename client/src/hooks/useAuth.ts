import { IAuthData } from '@types';

const useAuth = (): IAuthData => ({
  user: null,
  accessToken: '',
});

export default useAuth;

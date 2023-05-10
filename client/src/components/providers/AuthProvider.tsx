import { DELETE_CHANNEL_ROUTE } from '@data/consts';
import { FC, ReactElement, useEffect } from 'react';
import Loader from '@components/ui/common/Loader';
import useActions from '@hooks/useActions';
import useAuth from '@hooks/useAuth';
import useUtil from '@hooks/useUtil';
import userApi from '@store/api/user';

interface AuthProviderProps {
  children: ReactElement<any, any> | null;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { accessToken } = useAuth();
  const { userDeletion } = useUtil();
  const { setUser } = useActions();
  const { data, isLoading } = userApi.useGetProfileQuery(null, {
    skip: !accessToken || userDeletion,
  });
  useEffect(() => {
    if (data && accessToken) {
      setUser(data);
    }
  }, [data, accessToken, setUser]);
  return isLoading ? <Loader /> : children;
};

export default AuthProvider;

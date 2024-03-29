import { FC, ReactElement, useEffect } from 'react';
import LoaderScreen from '@components/ui/common/LoaderScreen';
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
  const { data, isLoading } = userApi.useGetProfileQuery(accessToken, {
    skip: !accessToken || userDeletion,
  });
  useEffect(() => {
    if (data && accessToken) {
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return isLoading ? <LoaderScreen /> : children;
};

export default AuthProvider;

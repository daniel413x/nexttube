import { FC, ReactElement, useEffect } from 'react';
import Loader from '@components/ui/common/Loader';
import useActions from '@hooks/useActions';
import useAuth from '@hooks/useAuth';
import api from '@store/api';

interface AuthProviderProps {
  children: ReactElement<any, any> | null;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { accessToken } = useAuth();
  const { setUser } = useActions();
  const { data, isLoading } = api.useGetProfileQuery(null, {
    skip: !accessToken,
  });
  useEffect(() => {
    if (data && accessToken) {
      setUser(data);
    }
  }, [data, accessToken, setUser]);
  return isLoading ? <Loader /> : children;
};

export default AuthProvider;

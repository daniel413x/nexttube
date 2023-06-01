import { FC, ReactElement } from 'react';
import LoaderScreen from '@components/ui/common/LoaderScreen';
import utilApi from '@store/api/util';

interface PingProviderProps {
  children: ReactElement<any, any> | null;
}

const PingProvider: FC<PingProviderProps> = ({ children }) => {
  const { data: pinged } = utilApi.usePingQuery({}, {});
  return !pinged ? <LoaderScreen /> : children;
};

export default PingProvider;

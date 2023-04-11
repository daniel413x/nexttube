import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import Wrapper from '@components/ui/home/Wrapper';

const HomeScreen: FC = () => (
  <GenericLayout title="NextTube">
    <Wrapper />
  </GenericLayout>
);

export default HomeScreen;

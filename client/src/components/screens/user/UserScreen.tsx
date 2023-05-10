import {
  DELETE_CHANNEL_ROUTE,
  DETAILS_ROUTE,
  SETTINGS_ROUTE,
} from '@data/consts';
import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import AccountHome from '@components/ui/user/AccountHome';
import DeleteForm from '@components/ui/user/delete/DeleteForm';
import DetailsUpdateForm from '@components/ui/user/details/DetailsForm';
import SettingsUpdateForm from '@components/ui/user/settings/SettingsForm';

interface UserScreenProps {
  title: string;
  route?: string;
}

const UserScreen: FC<UserScreenProps> = ({ route, title }) => {
  let content = <AccountHome />;
  if (route === SETTINGS_ROUTE) {
    content = <SettingsUpdateForm />;
  }
  if (route === DETAILS_ROUTE) {
    content = <DetailsUpdateForm />;
  }
  if (route === DELETE_CHANNEL_ROUTE) {
    content = <DeleteForm />;
  }
  return <MainLayout title={title}>{content}</MainLayout>;
};

UserScreen.defaultProps = {
  route: undefined,
};

export default UserScreen;

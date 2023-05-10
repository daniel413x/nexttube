import { REGISTERED, SETTINGS_ROUTE } from '@data/consts';
import UserScreen from '@components/screens/user/UserScreen';
import { NextPageAuthed } from '@types';

const SettingsPage: NextPageAuthed = () => (
  <UserScreen title="Settings" route={SETTINGS_ROUTE} />
);

SettingsPage.auth = [REGISTERED];

export default SettingsPage;

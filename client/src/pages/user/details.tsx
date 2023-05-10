import { DETAILS_ROUTE, REGISTERED } from '@data/consts';
import UserScreen from '@components/screens/user/UserScreen';
import { NextPageAuthed } from '@types';

const SettingsPage: NextPageAuthed = () => (
  <UserScreen title="Settings" route={DETAILS_ROUTE} />
);

SettingsPage.auth = [REGISTERED];

export default SettingsPage;

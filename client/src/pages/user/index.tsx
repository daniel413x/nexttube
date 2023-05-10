import { REGISTERED } from '@data/consts';
import UserScreen from '@components/screens/user/UserScreen';
import { NextPageAuthed } from '@types';

const UserPage: NextPageAuthed = () => <UserScreen title="Account" />;

UserPage.auth = [REGISTERED];

export default UserPage;

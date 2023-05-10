import { DELETE_CHANNEL_ROUTE, REGISTERED } from '@data/consts';
import UserScreen from '@components/screens/user/UserScreen';
import { NextPageAuthed } from '@types';

const DeletePage: NextPageAuthed = () => (
  <UserScreen title="Delete your account" route={DELETE_CHANNEL_ROUTE} />
);

DeletePage.auth = [REGISTERED];

export default DeletePage;

import { REGISTERED } from '@data/consts';
import { NextPageAuthed } from '@types';
import EditVideoPageScreen from '@components/screens/v/edit-video-page/EditVideoPageScreen';

const EditVideoPage: NextPageAuthed = () => <EditVideoPageScreen />;

EditVideoPage.auth = [REGISTERED];

export default EditVideoPage;

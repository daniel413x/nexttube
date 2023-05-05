import { REGISTERED } from '@data/consts';
import EditVideoPageScreen from '@components/screens/v/edit-video-page/EditVideoPageScreen';
import { NextPageAuthed } from '@types';

const EditVideoPage: NextPageAuthed = () => <EditVideoPageScreen />;

EditVideoPage.auth = [REGISTERED];

export default EditVideoPage;

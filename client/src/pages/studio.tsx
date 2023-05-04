import { REGISTERED } from '@data/consts';
import StudioScreen from '@components/screens/studio/StudioScreen';
import { NextPageAuthed } from '@types';

const StudioPage: NextPageAuthed = () => <StudioScreen />;

StudioPage.auth = [REGISTERED];

export default StudioPage;

import { REGISTERED } from '@data/consts';
import HomeScreen from '@components/screens/home';
import { NextPageAuthed } from '@types';

const StudioPage: NextPageAuthed = () => <HomeScreen />;

StudioPage.auth = [REGISTERED];

export default StudioPage;

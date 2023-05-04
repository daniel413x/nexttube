import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import VideoEdit from '@components/ui/v/edit-video/VideoEdit';

const EditVideoPageScreen: FC = () => (
  <GenericLayout title="Edit video">
    <VideoEdit />
  </GenericLayout>
);

export default EditVideoPageScreen;

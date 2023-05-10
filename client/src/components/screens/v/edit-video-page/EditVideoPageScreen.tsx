import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import VideoEdit from '@components/ui/v/edit-video/VideoEdit';

const EditVideoPageScreen: FC = () => (
  <MainLayout title="Edit video">
    <VideoEdit />
  </MainLayout>
);

export default EditVideoPageScreen;

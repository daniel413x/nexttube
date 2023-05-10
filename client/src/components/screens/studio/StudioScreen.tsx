import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import Catalog from '@components/ui/common/Catalog';
import useUser from '@hooks/useUser';
import videoApi from '@store/api/video';

const StudioScreen: FC = () => {
  const user = useUser();
  const [removeVideo] = videoApi.useDeleteVideoMutation();
  const { videos } = user!;
  const renderCatalog = videos.length > 0;
  return (
    <MainLayout title="Sudio">
      <div>
        {renderCatalog && (
          <Catalog videos={videos} removeHandler={removeVideo} isUpdateLink />
        )}
        {!renderCatalog && <p>You have not uploaded have any videos.</p>}
      </div>
    </MainLayout>
  );
};

export default StudioScreen;

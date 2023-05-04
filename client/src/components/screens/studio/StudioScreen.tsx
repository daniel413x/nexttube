import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import Catalog from '@components/ui/common/Catalog';
import useUser from '@hooks/useUser';
import videoApi from '@store/api/video';

const StudioScreen: FC = () => {
  const user = useUser();
  const [removeVideo] = videoApi.useDeleteVideoMutation();
  const { videos } = user!;
  const renderCatalog = videos.length > 0;
  return (
    <GenericLayout title="Sudio">
      <div>
        {renderCatalog && (
          <Catalog videos={videos} removeHandler={removeVideo} isUpdateLink />
        )}
        {!renderCatalog && <p>You have not uploaded have any videos.</p>}
      </div>
    </GenericLayout>
  );
};

export default StudioScreen;

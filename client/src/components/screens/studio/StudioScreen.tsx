import { FC, useState } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import Catalog from '@components/ui/common/Catalog';
import DeleteVideoModal from '@components/ui/modals/DeleteVideoModal';
import useUser from '@hooks/useUser';
import styles from './StudioScreen.module.scss';

const StudioScreen: FC = () => {
  const [deletedId, setDeletedId] = useState<string>('');
  const user = useUser();
  const { videos } = user!;
  const renderCatalog = videos.length > 0;
  return (
    <MainLayout title="Sudio">
      <DeleteVideoModal show={deletedId} close={() => setDeletedId('')} />
      {renderCatalog && (
        <Catalog videos={videos} removeHandler={setDeletedId} isUpdateLink />
      )}
      {!renderCatalog && (
        <p className={styles.noVideos}>
          You have not uploaded have any videos.
        </p>
      )}
    </MainLayout>
  );
};

export default StudioScreen;

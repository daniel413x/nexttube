import { FC } from 'react';
import { IVideo } from '@types';
import VideoItem from '../common/video-items/VideoItemSmall';
import SectionHeader from '../sectionHeader/SectionHeader';
import styles from './Catalog.module.scss';

interface CatalogProps {
  newVideos: IVideo[];
  removeHandler?: (videoId: string) => void;
  isUpdateLink?: boolean;
}

const Catalog: FC<CatalogProps> = ({
  newVideos,
  removeHandler,
  isUpdateLink,
}) => (
  <div className={styles.catalog}>
    <div className={styles.upperElements}>
      <SectionHeader title={removeHandler ? 'My videos' : 'Recommended'} />
    </div>
    <ul className={styles.itemsUl}>
      {newVideos.map((video) => (
        <li>
          <VideoItem
            video={video}
            key={video.id}
            removeHandler={removeHandler}
            isUpdateLink={isUpdateLink}
          />
        </li>
      ))}
    </ul>
  </div>
);

Catalog.defaultProps = {
  isUpdateLink: false,
  removeHandler: undefined,
};

export default Catalog;

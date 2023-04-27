import cn from 'classnames';
import { FC } from 'react';
import { IVideo } from '@types';
import SectionHeader from '../common/SectionHeader';
import VideoItem from '../common/video-items/VideoItemSmall';
import styles from './Catalog.module.scss';

interface CatalogProps {
  videos: IVideo[];
  removeHandler?: (videoId: string) => void;
  isUpdateLink?: boolean;
  itemsUlClassName?: string;
}

const Catalog: FC<CatalogProps> = ({
  videos,
  removeHandler,
  isUpdateLink,
  itemsUlClassName,
}) => (
  <div className={cn(styles.catalog)}>
    <div className={styles.upperElements}>
      <SectionHeader title={removeHandler ? 'My videos' : 'Recommended'} />
    </div>
    <ul className={cn(styles.itemsUl, itemsUlClassName)}>
      {videos.map((video) => (
        <li key={video.id}>
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
  itemsUlClassName: '',
};

export default Catalog;

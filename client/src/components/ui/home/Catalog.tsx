import cn from 'classnames';
import { FC } from 'react';
import { IVideo } from '@types';
import VideoItem from '../common/video-items/VideoItemSmall';
import SectionHeader from '../sectionHeader/SectionHeader';
import styles from './Catalog.module.scss';

interface CatalogProps {
  newVideos: IVideo[];
  removeHandler?: (videoId: string) => void;
  isUpdateLink?: boolean;
  itemsUlClassName?: string;
}

const Catalog: FC<CatalogProps> = ({
  newVideos,
  removeHandler,
  isUpdateLink,
  itemsUlClassName,
}) => (
  <div className={cn(styles.catalog)}>
    <div className={styles.upperElements}>
      <SectionHeader title={removeHandler ? 'My videos' : 'Recommended'} />
    </div>
    <ul className={cn(styles.itemsUl, itemsUlClassName)}>
      {newVideos.map((video) => (
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

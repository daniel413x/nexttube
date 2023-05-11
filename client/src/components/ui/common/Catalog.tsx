import { placeholderVideo } from '@data/state';
import cn from 'classnames';
import { FC } from 'react';
import { IVideo } from '@types';
import useCalculatePlaceholders from '@hooks/useCalculatePlaceholders';
import styles from './Catalog.module.scss';
import SectionHeader from './SectionHeader';
import VideoItem from './video-items/VideoItemSmall';

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
}) => {
  const placeholders = useCalculatePlaceholders({
    itemsLength: videos.length,
    lgCt: 3,
    xlCt: 4,
    mdCt: 2,
  });
  return (
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
        {Array.from({ length: placeholders }, (_, i) => (
          <li key={`placeholder${i}`}>
            <VideoItem placeholder video={placeholderVideo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

Catalog.defaultProps = {
  isUpdateLink: false,
  removeHandler: undefined,
  itemsUlClassName: '',
};

export default Catalog;

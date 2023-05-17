import { placeholderVideo } from '@data/state';
import cn from 'classnames';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { pathname } = router;
  const placeholders = useCalculatePlaceholders({
    itemsLength: videos.length,
    xlCt: 4,
    xxlCt: 4,
    lgCt: 3,
    mdCt: 2,
  });
  return (
    <div className={cn(styles.catalog)}>
      <div className={styles.upperElements}>
        <SectionHeader title={pathname !== '/' ? 'My videos' : 'Recommended'} />
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

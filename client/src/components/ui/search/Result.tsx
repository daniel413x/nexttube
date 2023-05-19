import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { IVideo } from '@types';
import VideoItemListView from '../common/video-items/VideoItemListView';
import VideoItemSmall from '../common/video-items/VideoItemSmall';
import styles from './Result.module.scss';

interface ResultProps {
  video: IVideo;
  md: boolean;
}

const SearchPageResults: FC<ResultProps> = ({ video, md }) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => setShow(true), []);
  return (
    <li
      className={cn(styles.result, {
        [styles.show]: show,
      })}
      key={video.name}
    >
      {md ? (
        <VideoItemListView video={video} key={video.id} />
      ) : (
        <VideoItemSmall video={video} key={video.id} />
      )}
    </li>
  );
};

export default SearchPageResults;

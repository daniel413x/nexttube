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

const Result: FC<ResultProps> = ({ video, md }) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => setShow(true), [video]);
  return (
    <li
      className={cn(styles.result, {
        [styles.show]: show,
      })}
    >
      {md ? (
        <VideoItemListView video={video} />
      ) : (
        <VideoItemSmall video={video} />
      )}
    </li>
  );
};

export default Result;

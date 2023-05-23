import cn from 'classnames';
import { ChangeEvent, FC, useEffect } from 'react';
import { BsFullscreen } from 'react-icons/bs';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { VideoStatus } from '@types';
import useFocused from '@hooks/useFocused';
import styles from './VideoControls.module.scss';

interface VideoControlsProps {
  status: VideoStatus;
  toggleVideo: () => void;
  fullScreen: () => void;
  handleProgressChange: (e: ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
}

const VideoControls: FC<VideoControlsProps> = ({
  status,
  toggleVideo,
  fullScreen,
  handleProgressChange,
  show,
}) => {
  const { ref, focused } = useFocused(true);
  useEffect(() => {
    console.log(focused);
  }, [focused]);
  return (
    <div
      className={cn(styles.controls, {
        [styles.show]: show || focused,
      })}
      ref={ref}
    >
      <button type="button" onClick={toggleVideo}>
        {status.isPlaying ? <IoMdPause /> : <IoMdPlay />}
      </button>
      <input
        className={styles.progressBar}
        type="range"
        title=""
        value={status.progress || 0}
        onChange={handleProgressChange}
        style={{ backgroundSize: `${status.progress}% 100%` }}
      />
      <div className={styles.timeControls}>
        <p>
          {`${Math.floor(status.currentTime / 60)}:${`0${Math.floor(
            status.currentTime % 60
          )}`.slice(-2)}`}
        </p>
        <p>/</p>
        <p>
          {`${Math.floor(status.videoTime / 60)}:${`0${Math.floor(
            status.videoTime % 60
          )}`.slice(-2)}`}
        </p>
      </div>
      <button type="button" onClick={fullScreen}>
        <BsFullscreen className="text-tiny" />
      </button>
    </div>
  );
};

export default VideoControls;

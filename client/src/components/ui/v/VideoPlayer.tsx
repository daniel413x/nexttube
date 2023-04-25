import cn from 'classnames';
import { FC, useEffect } from 'react';
import { BsFullscreen } from 'react-icons/bs';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import useActions from '@hooks/useActions';
import usePlayer from '@hooks/usePlayer';
import useTrackDimensions from '@hooks/useTrackDimensions';
import styles from './VideoPlayer.module.scss';

interface VideoPlayerProps {
  videoPath: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoPath }) => {
  const { videoRef, toggleVideo, status, fullScreen, metadataLoaded } =
    usePlayer();
  const { setVideoHeight } = useActions();
  const { height: videoHeight } = useTrackDimensions(videoRef);
  useEffect(() => {
    if (metadataLoaded && videoHeight) {
      setVideoHeight(videoHeight);
    }
  }, [metadataLoaded, videoHeight, setVideoHeight]);
  return (
    <div className={styles.wrapper}>
      <video
        id="video"
        ref={videoRef}
        className={styles.player}
        src={`${videoPath}#t=8`}
        preload="metadata"
        onClick={toggleVideo}
      >
        <track kind="captions" default />
      </video>
      <div
        className={cn(styles.controls, {
          [styles.hide]: status.isPlaying,
        })}
      >
        <button type="button" onClick={toggleVideo}>
          {status.isPlaying ? <IoMdPause /> : <IoMdPlay />}
        </button>
        <div className={styles.progressBarWrapper}>
          <div
            className={styles.progressBar}
            style={{
              width: `${status.progress}%`,
            }}
          />
        </div>
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
    </div>
  );
};

export default VideoPlayer;

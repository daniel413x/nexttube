import cn from 'classnames';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import useActions from '@hooks/useActions';
import useBreakpoints from '@hooks/useBreakpoints';
import usePlayer from '@hooks/usePlayer';
import useTrackDimensions from '@hooks/useTrackDimensions';
import VideoControls from './VideoControls';
import styles from './VideoPlayer.module.scss';

interface VideoPlayerProps {
  videoPath: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoPath }) => {
  const router = useRouter();
  const mobile = !useBreakpoints().sm;
  const { t } = router.query;
  const {
    videoRef,
    toggleVideo,
    status,
    fullScreen,
    metadataLoaded,
    handleProgressChange,
  } = usePlayer();
  const [showControls, setShowControls] = useState<boolean>(true);
  const { setVideoHeight } = useActions();
  const { height: videoHeight } = useTrackDimensions(videoRef);
  const hideControlsTimeout = () =>
    setTimeout(() => setShowControls(false), 300);
  useEffect(() => {
    if (metadataLoaded && videoHeight) {
      setVideoHeight(videoHeight);
    }
  }, [metadataLoaded, videoHeight, setVideoHeight]);
  const handleOnClick = () => {
    if (mobile) {
      if (status.isPlaying) {
        if (showControls) {
          return setShowControls(false);
        }
        return setShowControls(true);
      }
    }
    return toggleVideo();
  };
  useEffect(() => {
    if (mobile && status.isPlaying && status.currentTime === 0) {
      setShowControls(false);
    }
  }, [mobile, status.isPlaying, status.currentTime, fullScreen]);
  return (
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => hideControlsTimeout()}
      className={styles.wrapper}
    >
      <video
        id="video"
        ref={videoRef}
        className={cn(styles.player, {
          [styles.mobile]: mobile,
        })}
        src={`${videoPath}#${t ? `t=${t}` : ''}`}
        preload="metadata"
        onClick={handleOnClick}
      >
        <track kind="captions" default />
      </video>
      <VideoControls
        status={status}
        toggleVideo={toggleVideo}
        fullScreen={fullScreen}
        show={showControls}
        handleProgressChange={handleProgressChange}
      />
    </div>
  );
};

export default VideoPlayer;

import { useCallback, useEffect, useRef, useState } from 'react';
import { IVideoElement } from '@types';

const usePlayer = () => {
  const videoRef = useRef<IVideoElement>(null);
  const [isShowButton, setIsShowButton] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  useEffect(() => {
    const originalDuration = videoRef.current?.duration;
    if (originalDuration) {
      setVideoTime(originalDuration);
    }
  }, [videoRef.current?.duration]);
  const toggleVideo = useCallback(() => {
    if (!isPlaying) {
      videoRef.current?.play();
      setIsPlaying(true);
      setTimeout(() => {
        setIsShowButton(false);
      }, 1500);
    } else {
      setIsShowButton(true);
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);
  const forward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 15;
    }
  };
  const back = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 15;
    }
  };
  const fullScreen = () => {
    const video = videoRef.current;
    if (video?.requestFullscreen) {
      video.requestFullscreen();
    } else if (video?.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video?.mozRequestFullscreen) {
      video.mozRequestFullscreen();
    } else if (video?.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / videoTime) * 100);
    };
    video.addEventListener('timeupdate', updateProgress);
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, [videoTime]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')
      ) {
        return;
      }
      switch (e.key) {
        case 'ArrowRight':
          forward();
          break;
        case 'ArrowLeft':
          back();
          break;
        case ' ':
          e.preventDefault();
          toggleVideo();
          break;
        case 'f':
          fullScreen();
          break;
        default:
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleVideo]);
  useEffect(() => {
    const handleMetadataLoaded = () => setMetadataLoaded(true);
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener(
          'loadedmetadata',
          handleMetadataLoaded
        );
      }
    };
  }, [videoRef]);
  return {
    videoRef,
    toggleVideo,
    fullScreen,
    status: {
      isPlaying,
      progress,
      isShowButton, // don't need?
      currentTime,
      videoTime,
    },
    metadataLoaded,
  };
};

export default usePlayer;

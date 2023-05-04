import Image from 'next/image';
import { FC, ReactElement } from 'react';
import CopyButton from '../../CopyButton';
import styles from './VideoInformation.module.scss';

interface VideoInformationProps {
  fileName: string;
  videoId: string;
  isUploaded: boolean;
  thumbnailPath: string;
  ThumbnailInput: ReactElement;
}

const VideoInformation: FC<VideoInformationProps> = ({
  fileName,
  videoId,
  isUploaded,
  thumbnailPath,
  ThumbnailInput,
}) => {
  const videoLink = `${process.env.NEXT_PUBLIC_API_URL}/v/${videoId}`;
  const videoLinkShortened = `${videoLink.slice(0, 16)}...`;
  const fileNameShortened = `${fileName.slice(0, 25)}...${fileName.slice(
    fileName.length - 3
  )}`;
  return (
    <div className={styles.videoInformation}>
      <div className={styles.thumbnailCol}>
        <span className={styles.label}>Thumbnail</span>
        <div className={styles.imgWrapper}>
          {!thumbnailPath ? (
            <span className={styles.statusMessage}>
              {!isUploaded ? 'Loading video...' : 'You must upload a thumbnail'}
            </span>
          ) : (
            <Image
              src={thumbnailPath}
              width={344}
              height={190}
              alt="Your video thumbnail preview"
              layout="responsive"
            />
          )}
        </div>
        {ThumbnailInput}
      </div>
      <div className={styles.details}>
        <div className={styles.pairing}>
          <span className={styles.label}>Video link</span>
          <span className={styles.link}>
            <CopyButton className={styles.link} copyText={videoLink}>
              {videoLinkShortened || '.'}
            </CopyButton>
          </span>
        </div>
        <div className={styles.pairing}>
          <span className={styles.label}>Video filename</span>
          <span className={styles.fileName}>{fileNameShortened || '.'}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoInformation;

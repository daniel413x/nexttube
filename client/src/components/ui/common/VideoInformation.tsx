import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { BsFiletypeMp4 } from 'react-icons/bs';
import { CgClipboard } from 'react-icons/cg';
import CopyButton from './CopyButton';
import IconSpan from './IconSpan';
import styles from './VideoInformation.module.scss';

interface VideoInformationProps {
  fileName?: string;
  videoId: string;
  isUploaded: boolean;
  thumbnailPath: string;
  ThumbnailInput?: ReactElement;
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
  const fileNameShortened = fileName
    ? `${fileName.slice(0, 25)}...${fileName.slice(fileName.length - 3)}`
    : '';
  return (
    <div className={styles.videoInformation}>
      <div className={styles.thumbnailCol}>
        <span className={styles.label}>Thumbnail (16:9)</span>
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
        <div className={styles.thumbnailInput}>{ThumbnailInput}</div>
      </div>
      <div className={styles.details}>
        <div className={styles.pairing}>
          <span className={styles.label}>Video link</span>
          <CopyButton copyText={videoLink}>
            <span className={styles.link}>
              <IconSpan Icon={CgClipboard} />
              {videoLinkShortened || '.'}
            </span>
          </CopyButton>
        </div>
        <div className={styles.pairing}>
          <span className={styles.label}>Video filename</span>
          <div>
            <span className={styles.fileName}>
              <IconSpan Icon={BsFiletypeMp4} />
              {fileNameShortened || '.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoInformation.defaultProps = {
  ThumbnailInput: undefined,
  fileName: '',
};

export default VideoInformation;

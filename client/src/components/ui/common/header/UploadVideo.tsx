import cn from 'classnames';
import { FC, useState } from 'react';
import { HiUpload } from 'react-icons/hi';
import videoApi from '@store/api/video';
import IconSpan from '../IconSpan';
import iconsStyles from './IconsRight.module.scss';
import styles from './UploadVideo.module.scss';

const UploadVideo: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>('');
  const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation();
  return (
    <button
      className={cn(styles.uploadVideo, iconsStyles)}
      disabled={isLoading}
      type="button"
      onClick={() => {
        createVideo()
          .unwrap()
          .then((id) => {
            setVideoId(id);
            setOpen(true);
          });
      }}
    >
      <IconSpan Icon={HiUpload} />
    </button>
  );
};

export default UploadVideo;

import { FC, useState } from 'react';
import { HiUpload } from 'react-icons/hi';
import videoApi from '@store/api/video';
import IconSpan from '../common/IconSpan';
import iconsStyles from './IconsRight.module.scss';

// import styles from './UploadVideo.module.scss';

const UploadVideo: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>('');
  const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation();
  return (
    <div>
      <button
        className={iconsStyles.button}
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
    </div>
  );
};

export default UploadVideo;

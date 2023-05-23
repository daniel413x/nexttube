import cn from 'classnames';
import { FC, useState } from 'react';
import { HiUpload } from 'react-icons/hi';
import IconSpan from '@components/ui/common/IconSpan';
import UploadModal from '@components/ui/modals/UploadModal';
import videoApi from '@store/api/video';
import iconsStyles from '../IconsRight.module.scss';

const UploadVideoButton: FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>('');
  const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation();
  return (
    <>
      <UploadModal videoId={videoId} show={show} close={() => setShow(false)} />
      <button
        className={cn(iconsStyles)}
        disabled={isLoading}
        type="button"
        title="Upload video"
        onClick={() => {
          createVideo()
            .unwrap()
            .then((id) => {
              setVideoId(id);
              setShow(true);
            });
        }}
      >
        <IconSpan Icon={HiUpload} />
      </button>
    </>
  );
};

export default UploadVideoButton;

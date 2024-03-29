import { PUBLIC } from '@data/consts';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { IMediaResponse } from '@types';
import useUploadVideoForm from '@hooks/useUploadVideoForm';
import Input from '../../Input';
import Textarea from '../../Textarea';
import Toggle from '../../Toggle';
import UploadField from '../../UploadField';
import VideoInformation from '../../VideoInformation';
import FooterForm from './FooterForm';
import SuccessMessage from './SuccessMessage';
import styles from './UploadVideoForm.module.scss';

interface UploadVideoFormProps {
  videoId: string;
  handleCloseModal: () => void;
}

const UploadVideoForm: FC<UploadVideoFormProps> = ({
  videoId,
  handleCloseModal,
}) => {
  const { form, status, media } = useUploadVideoForm({
    videoId,
    handleCloseModal,
  });
  return (
    <form
      onSubmit={form.handleSubmit(form.onSubmit)}
      className={styles.uploadVideoForm}
    >
      {status.isSuccess && <SuccessMessage />}
      {status.isChosen ? (
        <>
          <div className={styles.upper}>
            <div className={styles.nameDescription}>
              <Input
                {...form.register('name', {
                  required: 'Title required',
                })}
                placeholder="Title"
                error={form.errors.name}
              />
              <Textarea
                {...form.register('description', {
                  required: 'Description required',
                })}
                placeholder="Description"
                error={form.errors.description}
              />
              <Controller
                defaultValue={[]}
                control={form.control}
                name="flags"
                render={({ field: { onChange, value } }) => (
                  <Toggle
                    label="Public video"
                    clickHandler={() => {
                      if (value.includes(PUBLIC)) {
                        onChange([]);
                      } else {
                        onChange([PUBLIC]);
                      }
                    }}
                    isEnabled={value.includes(PUBLIC)}
                  />
                )}
              />
            </div>
            <div className={styles.videoInformation}>
              <VideoInformation
                fileName={media.videoFileName}
                videoId={videoId}
                isUploaded={status.isUploaded}
                thumbnailPath={media.thumbnailPath}
                ThumbnailInput={
                  <Controller
                    control={form.control}
                    name="thumbnailPath"
                    render={({ field: { onChange } }) => (
                      <UploadField
                        folder="thumbnails"
                        onChange={(value: IMediaResponse) => {
                          onChange(value.url);
                        }}
                      />
                    )}
                  />
                }
              />
            </div>
          </div>
          <FooterForm
            isUploaded={status.isUploaded}
            percent={status.percent}
            isSuccess={status.isSuccess}
            isLoading={status.isLoading}
            // eslint-disable-next-line no-underscore-dangle
            reset={form.control._reset}
            handleCloseModal={() => handleCloseModal()}
          />
        </>
      ) : (
        <Controller
          control={form.control}
          name="videoPath"
          render={() =>
            (
              <UploadField
                title="&#128071; Upload your video"
                folder="videos"
                onChange={media.handleUploadVideo}
                setValue={status.setProgressPercent}
                setIsChosen={status.setIsChosen}
              />
            ) as any
          }
        />
      )}
    </form>
  );
};

export default UploadVideoForm;

import { PUBLIC } from '@data/consts';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IMediaResponse, IVideoDto } from '@types';
import videoApi from '@store/api/video';
import { toastSuccess } from '@utils';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Loader from '../../common/Loader';
import Textarea from '../../common/Textarea';
import TogglePublic from '../../common/header/upload-video/TogglePublic';
import UploadField from '../../common/header/upload-video/UploadField';
import VideoInformation from '../../common/header/upload-video/VideoInformation';
import styles from './VideoEdit.module.scss';

const VideoEdit: FC = () => {
  const { query } = useRouter();
  const videoId = query.id as string;
  const { data, isLoading } = videoApi.useGetVideoByIdQuery(videoId, {
    skip: !videoId,
  });
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<IVideoDto>({
    mode: 'onChange',
  });
  useEffect(() => {
    if (!watch('name') && data) {
      setValue('name', data.name);
      setValue('description', data.description);
      setValue('videoPath', data.videoPath);
      setValue('thumbnailPath', data.thumbnailPath);
      setValue('flags', data.flags);
    }
  }, [data, setValue, watch]);
  const [updateVideo, { isLoading: isUpdateLoading }] =
    videoApi.useUpdateVideoMutation();
  const onSubmit: SubmitHandler<IVideoDto> = (submitData) => {
    updateVideo({ ...submitData, id: videoId })
      .unwrap()
      .then(() => {
        toastSuccess('Video updated!', 'Success');
      });
  };
  return (
    <div className={styles.videoEdit}>
      {isLoading ? (
        <Loader count={5} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.leftColFields}>
            <Input
              {...register('name', {
                required: 'Name is required',
              })}
              placeholder="Name"
              error={errors.name}
            />
            <Textarea
              {...register('description', {
                required: 'Description is required',
              })}
              placeholder="Description"
              error={errors.description}
            />
            <div className={styles.videoField}>
              <span className={styles.label}>Video:</span>
              <Controller
                control={control}
                name="videoPath"
                render={({ field: { onChange } }) => (
                  <UploadField
                    folder="videos"
                    onChange={(value: IMediaResponse) => {
                      onChange(value.url);
                    }}
                  />
                )}
              />
            </div>
            <Controller
              defaultValue={[]}
              control={control}
              name="flags"
              render={({ field: { onChange, value } }) =>
                (
                  <TogglePublic
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
                ) as any
              }
            />
          </div>
          <div className={styles.videoInformation}>
            <VideoInformation
              fileName={data?.videoPath}
              videoId={videoId}
              isUploaded
              thumbnailPath={watch('thumbnailPath')}
              ThumbnailInput={
                <Controller
                  control={control}
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
          <Button
            className={styles.submitButton}
            color="lightBlue"
            type="submit"
            disabled={isUpdateLoading}
          >
            {isUpdateLoading ? 'Please wait...' : 'Save'}
          </Button>
        </form>
      )}
    </div>
  );
};

VideoEdit.defaultProps = {
  isUpdateLink: false,
  removeHandler: undefined,
  itemsUlClassName: '',
};

export default VideoEdit;

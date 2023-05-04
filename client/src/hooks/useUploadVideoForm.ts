import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import { IMediaResponse, IVideoDto } from '@types';
import videoApi from '@store/api/video';

interface UseUploadVideoFormProps {
  handleCloseModal: () => void;
  videoId: string;
}

interface UseUploadVideoFormReturn {
  form: Pick<
    UseFormReturn<IVideoDto>,
    'register' | 'handleSubmit' | 'control'
  > & {
    errors: any;
    onSubmit: (data: IVideoDto) => void;
  };
  media: {
    videoPath: string;
    thumbnailPath: string;
    videoFileName: string;
    handleUploadVideo: (value: IMediaResponse) => void;
  };
  status: {
    isSuccess: boolean;
    isChosen: boolean;
    setIsChosen: Dispatch<SetStateAction<boolean>>;
    percent: number;
    isUploaded: boolean;
    setProgressPercent: (number: number) => void;
  };
}

const useUploadVideoForm = ({
  videoId,
}: UseUploadVideoFormProps): UseUploadVideoFormReturn => {
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
  const [updateVideo, { isSuccess }] = videoApi.useUpdateVideoMutation();
  const onSubmit: SubmitHandler<IVideoDto> = (data) => {
    updateVideo({ ...data, id: videoId }).unwrap();
  };
  const videoPath = watch('videoPath');
  const thumbnailPath = watch('thumbnailPath');
  const [videoFileName, setVideoFileName] = useState<string>('');
  const handleUploadVideo = (value: IMediaResponse) => {
    setValue('videoPath', value.url);
    setValue('name', value.name);
    setVideoFileName(value.name);
  };
  const [isChosen, setIsChosen] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const setProgressPercent = (num: number) => {
    setPercent(num);
    if (num === 100) {
      setIsUploaded(true);
    }
  };
  return {
    form: {
      register,
      handleSubmit,
      control,
      errors,
      onSubmit,
    },
    media: {
      videoPath,
      thumbnailPath,
      videoFileName,
      handleUploadVideo,
    },
    status: {
      isSuccess,
      isChosen,
      setIsChosen,
      percent,
      isUploaded,
      setProgressPercent,
    },
  };
};

export default useUploadVideoForm;

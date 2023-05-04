import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import MediaService from '@services/mediaService';
import { errorCatch } from '@utils';

const useUploadFile = (
  onChange: (...event: any) => void,
  folder: string,
  setShowErrorModal: (string: string) => void,
  setValue?: (val: number) => void,
  setIsChosen?: Dispatch<SetStateAction<boolean>>
) => {
  const imageUpload = folder === 'thumbnails';
  const { mutateAsync } = useMutation(
    'upload file',
    (data: FormData) => MediaService.upload(data, folder, setValue),
    {
      onSuccess: ({ name, url }) => {
        onChange({ name, url });
      },
      onError: (error: any) => {
        setShowErrorModal(errorCatch(error));
      },
    }
  );
  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.length) {
      return;
    }
    if (imageUpload) {
      if (
        files[0].type !== 'image/jpg' &&
        files[0].type !== 'image/png' &&
        files[0].type !== 'image/jpeg'
      ) {
        setShowErrorModal('File must end in .jpg, .jpeg or .png');
        return;
      }
    } else if (files[0].type !== 'video/mp4') {
      setShowErrorModal('File must end in .mp4');
      return;
    }
    if (setIsChosen) {
      setIsChosen(true);
    }
    const formData = new FormData();
    formData.append('media', files[0]);
    await mutateAsync(formData);
  };
  return {
    uploadFile,
  };
};

export default useUploadFile;

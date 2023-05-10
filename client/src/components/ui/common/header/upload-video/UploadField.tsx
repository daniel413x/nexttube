import cn from 'classnames';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { BsFiletypeJpg, BsFiletypeMp4 } from 'react-icons/bs';
import ErrorModal from '@components/ui/modals/ErrorModal';
import { SCSSModule } from '@types';
import useUploadFile from '@hooks/useUploadFile';
import { cobbleStyles } from '@utils';
import IconSpan from '../../IconSpan';
import defaultStyles from './UploadField.module.scss';

interface UploadFieldProps {
  title?: string;
  onChange: (...event: any) => void;
  folder: string;
  setValue?: (val: number) => void;
  setIsChosen?: Dispatch<SetStateAction<boolean>>;
  parentStyles?: SCSSModule;
  className?: string;
}

const UploadField: FC<UploadFieldProps> = ({
  title,
  onChange,
  folder,
  setValue,
  setIsChosen,
  parentStyles,
  className,
}) => {
  const [showErrorModal, setShowErrorModal] = useState<string>('');
  const styles = cobbleStyles(defaultStyles, parentStyles);
  const { uploadFile } = useUploadFile(
    onChange,
    folder,
    setShowErrorModal,
    setValue,
    setIsChosen
  );
  const imageUpload = folder === 'thumbnails' || folder === 'avatars';
  return (
    <>
      <ErrorModal show={showErrorModal} close={() => setShowErrorModal('')} />
      <div className={cn(styles.uploadField, className)}>
        {title && <h1>{title}</h1>}
        <label htmlFor="file-input">
          <span className={styles.srLabel}>Choose file</span>
          <div className={styles.iconInput}>
            <IconSpan Icon={imageUpload ? BsFiletypeJpg : BsFiletypeMp4} />
            <input
              className={styles.fileInput}
              id="file-input"
              type="file"
              value=""
              onChange={uploadFile}
              accept={
                imageUpload ? 'image/jpg, image/jpeg, image/png' : 'video/mp4'
              }
            />
          </div>
        </label>
      </div>
    </>
  );
};

UploadField.defaultProps = {
  title: '',
  className: '',
  parentStyles: undefined,
  setValue: undefined,
  setIsChosen: undefined,
};

export default UploadField;

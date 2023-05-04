import cn from 'classnames';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import ErrorModal from '@components/ui/modals/ErrorModal';
import { SCSSModule } from '@types';
import useUploadFile from '@hooks/useUploadFile';
import { cobbleStyles } from '@utils';
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
  const imageUpload = folder === 'thumbnails';
  return (
    <>
      <ErrorModal show={showErrorModal} close={() => setShowErrorModal('')} />
      <div className={cn(styles.uploadField, className)}>
        {title && <h1>{title}</h1>}
        <label htmlFor="file-input">
          <span className={styles.srLabel}>Choose file</span>
          <input
            id="file-input"
            type="file"
            value=""
            onChange={uploadFile}
            accept={
              imageUpload ? 'image/jpg, image/jpeg, image/png' : 'video/mp4'
            }
          />
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

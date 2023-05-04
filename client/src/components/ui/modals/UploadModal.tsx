import React from 'react';
import UploadVideoForm from '../common/header/upload-video/UploadVideoForm';
import Modal from './Modal';

interface UploadModalProps {
  show: any;
  close: () => void;
  videoId: string;
}

const UploadModal = ({ show, close, videoId }: UploadModalProps) => (
  <Modal show={show} close={close}>
    <UploadVideoForm handleCloseModal={close} videoId={videoId} />
  </Modal>
);

export default UploadModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadPicture from './UploadPictureModal';

function UploadPictureModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadPicture />
        </Modal>
      )}
    </>
  );
}

export default UploadPictureModal;

import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import UploadPostModals from './UploadPostModals';

function UploadPostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i onClick={() => setShowModal(true)} className="fa-regular fa-square-plus i-img"></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadPostModals setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UploadPostModal;

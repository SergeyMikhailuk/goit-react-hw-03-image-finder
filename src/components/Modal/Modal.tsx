import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ imageUrl, alt, handleBackdropClick }: ModalProps) => {
  if (!modalRoot) return null;

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={imageUrl} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

type ModalProps = {
  imageUrl: string;
  alt: string;
  handleBackdropClick: (e: any) => void;
};

import { useRef } from 'react';
import { useOutsideAlerter } from '../../../lib/hooks';
import { CloseIcon, QuestionIcon } from '../../../lib/icons';

export const Modal = ({
  isOpen,
  onClose,
  icon = <QuestionIcon />,
  title,
  children,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClose);

  return isOpen && (
    <div className="modal">
      <div className="modal__wrapper" ref={wrapperRef}>
        <div className="modal__header">
          <button className="modal__header__close-icon" type="button" onClick={onClose}>
            <CloseIcon />
          </button>
          <div className="modal__header__icon">
            {icon}
          </div>
          <span className="modal__header__title">
            {title}
          </span>
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

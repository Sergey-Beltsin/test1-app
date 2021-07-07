import { useEffect } from 'react';

export const useOutsideAlerter = (ref, onClose) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        event.preventDefault();
        onClose();
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [ref]);
};

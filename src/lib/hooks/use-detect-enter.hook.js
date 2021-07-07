import { useEffect } from 'react';

export const useDetectEnter = (onClick) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (+event.keyCode === 13) {
        event.preventDefault();
        onClick();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClick]);
};

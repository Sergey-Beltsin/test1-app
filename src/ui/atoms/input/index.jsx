import { forwardRef, useState } from 'react';
import { CloseIcon } from '../../../lib/icons';
import { useDetectEnter } from '../../../lib/hooks';

export const Input = forwardRef(({
  value,
  onChange,
  type = 'text',
  searchable = false,
  onClickSearch,
  onClose,
  onKeyDown,
  searchButtonText = 'Найти',
}, ref) => {
  const [defaultValue, setValue] = useState(value || '');
  useDetectEnter(() => onClickSearch(defaultValue));

  const handleChange = (currentValue) => {
    if (onChange) {
      onChange(currentValue);
    }
    setValue(currentValue);
  };

  return (
    <div className="input__main-wrapper">
      <div className="input__wrapper">
        <input
          ref={ref}
          type={type}
          className="input"
          value={defaultValue}
          onChange={({ target }) => handleChange(target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          className="input__clear-icon"
          type="button"
          onClick={() => onClose()}
        >
          <CloseIcon />
        </button>
      </div>
      {searchable && (
        <button
          className="input__button"
          type="button"
          onClick={() => onClickSearch(defaultValue)}
        >
          {searchButtonText}
        </button>
      )}
    </div>
  );
});

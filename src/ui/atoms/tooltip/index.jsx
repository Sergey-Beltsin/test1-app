import { useState } from 'react';

export const Tooltip = ({
  children,
  text,
  trigger = 'hover',
  isVisible,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="tooltip">
      <button
        className="tooltip__trigger"
        onClick={() => trigger === 'click' && setIsTooltipVisible(true)}
        onMouseEnter={() => trigger === 'hover' && setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        type="button"
        data-visible={!!isVisible}
      >
        {children}
      </button>
      {isTooltipVisible && (
        <div
          className="tooltip__content__wrapper"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          <div className="tooltip__content">
            {text}
          </div>
        </div>
      )}
    </div>
  );
};

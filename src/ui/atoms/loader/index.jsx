export const Loader = ({ isFullScreen = false }) => (
  <div className={`loader${isFullScreen ? ' loader--full-screen' : ''}`}>
    <div className="loader__wrapper">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

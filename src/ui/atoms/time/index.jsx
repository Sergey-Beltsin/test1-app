export const CurrentTime = ({ currentDay, currentTime }) => (
  <div className="main__time">
    <span className="main__time__day">
      {currentDay}
    </span>
    <span className="main__time__time">
      {currentTime}
    </span>
  </div>
);

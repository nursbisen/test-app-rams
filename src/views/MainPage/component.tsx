import useContainer from './hook';
import { ALL_FRAMES_ARRAY } from '../../constants/frames';

import './styles.css';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="chevronIcon" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="chevronIcon" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

const MainPage = () => {
  const {
    isDragged,
    currentFrame,
    handleMouseUp,
    spinToPrevView,
    spinToNextView,
    handleMouseDown,
    handleMouseMove,
  } = useContainer();

  return (
    <div>
      <div
        className="imgWrapper"
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={isDragged ? handleMouseMove : undefined}
      >
        <img
          style={{ cursor: isDragged ? 'grabbing' : 'grab' }}
          draggable={false}
          src={`frames/${currentFrame}.jpg`}
        />
      </div>
      <button
        type="button"
        className="leftButton"
        onClick={spinToPrevView}
      >
        <ArrowLeftIcon />
      </button>
      <button
        type="button"
        className="rightButton"
        onClick={spinToNextView}
      >
        <ArrowRightIcon />
      </button>
      <div style={{ display: 'none' }}>
        {ALL_FRAMES_ARRAY.map((frameNum) => (
          <img key={frameNum} src={`frames/${frameNum}.jpg`} />
        ))}
      </div>
    </div>
  )
};

export default MainPage;

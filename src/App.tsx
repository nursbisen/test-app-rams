import { useState } from 'react';

import './App.css';

const FPS = 30; // Frames per second

const FIRST_FRAME = 0;
const LAST_FRAME = 119;
const DEFAULT_FRAME = 18;

const FRAMES_TO_VIEW = [18, 49, 86];

const App = () => {
  const [currentFrame, setCurrentFrame] = useState(DEFAULT_FRAME);

  const rewindToNextView = () => {
    setCurrentFrame((prev) => prev + 1);

    const framesInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        if (FRAMES_TO_VIEW.includes(prevFrame)) {
          clearInterval(framesInterval);
          return prevFrame;
        }

        if (prevFrame === LAST_FRAME) {
          return FIRST_FRAME;
        }

        return prevFrame + 1;
      });
    }, 1000 / FPS);
  };

  const rewindToPrevView = () => {
    setCurrentFrame((prev) => prev - 1);

    const framesInterval = setInterval(() => {
      setCurrentFrame ((prevFrame) => {
        if (FRAMES_TO_VIEW.includes(prevFrame)) {
          clearInterval(framesInterval);
          return prevFrame;
        }

        if (prevFrame === FIRST_FRAME) {
          return LAST_FRAME;
        }

        return prevFrame - 1;
      });

    }, 1000 / FPS);
  };

  return (
    <div className="app">
      <img src={`src/assets/frames/${currentFrame}.jpg`} />
      <div className="buttonsWrapper">
        <button type="button" onClick={rewindToPrevView}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="chevron" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </button>
        <button type="button" onClick={rewindToNextView}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="chevron" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
    </div>
  )
};

export default App;

import { useEffect, useState } from 'react';

import {
  FPS,
  LAST_FRAME,
  FIRST_FRAME,
  DEFAULT_FRAME,
  FRAMES_TO_VIEW,
} from '../../constants/frames';

const useContainer = () => {
  const [isDragged, setDragged] = useState(false);
  const [prevPositionX, setPositionX] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(DEFAULT_FRAME);
  
  const increaseCurrentFrame = (intervalId?: NodeJS.Timer) => {
    setCurrentFrame((prevFrame) => {
      let newFrame = ++prevFrame;

      if (prevFrame === LAST_FRAME) {
        newFrame = FIRST_FRAME;
      }

      if (FRAMES_TO_VIEW.includes(newFrame)) {
        clearInterval(intervalId);
      }

      return newFrame;
    });
  };

  const decreaseCurrentFrame = (intervalId?: NodeJS.Timer) => {
    setCurrentFrame((prevFrame) => {
      let newFrame = --prevFrame;

      if (prevFrame === FIRST_FRAME) {
        newFrame = LAST_FRAME;
      }

      if (FRAMES_TO_VIEW.includes(newFrame)) {
        clearInterval(intervalId);
      }

      return newFrame;
    });
  };

  const spinToNextView = () => {
    const framesInterval = setInterval(() => {
      increaseCurrentFrame(framesInterval);
    }, 1000 / FPS);
  };
  
  const spinToPrevView = () => {
    const framesInterval = setInterval(() => {
      decreaseCurrentFrame(framesInterval);
    }, 1000 / FPS);
  };

  const handleMouseDown = () => {
    setDragged(true);
  };

  const handleMouseUp = () => {
    setDragged(false);

    const getSpinDirection = () => {
      if (FRAMES_TO_VIEW.includes(currentFrame)) return;

      const closestPrevFrame = Math.max(...FRAMES_TO_VIEW.filter((frame) => frame < currentFrame));
      const closestNextFrame = Math.min(...FRAMES_TO_VIEW.filter((frame) => frame > currentFrame));

      let distanceToPrevFrame = currentFrame - closestPrevFrame;
      let distanceToNextFrame = closestNextFrame - currentFrame;

      if (closestPrevFrame === -Infinity) {
        distanceToPrevFrame = (LAST_FRAME - Math.max(...FRAMES_TO_VIEW)) + (currentFrame - FIRST_FRAME);
      }

      if (closestNextFrame === Infinity) {
        distanceToNextFrame = (Math.min(...FRAMES_TO_VIEW) - FIRST_FRAME) + (LAST_FRAME - currentFrame);
      }

      return distanceToPrevFrame < distanceToNextFrame ? 'prev' : 'next';
    };

    const spinDirection = getSpinDirection();

    if (spinDirection === 'prev') spinToPrevView();
    if (spinDirection === 'next') spinToNextView();
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const newPositionX = e.pageX;
    const movedDistance = prevPositionX - newPositionX;
    const stepDistance = 20;

    if (movedDistance > stepDistance) {
      decreaseCurrentFrame();
      setPositionX(newPositionX);
    }

    if (movedDistance < -stepDistance) {
      increaseCurrentFrame();
      setPositionX(newPositionX);
    }
  };

  useEffect(() => {
    const handleKeyboardArrows = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") spinToPrevView();
      if (e.key === "ArrowRight") spinToNextView(); 
    };

    document.addEventListener('keydown', handleKeyboardArrows);

    return () => {
      document.removeEventListener('keydown', handleKeyboardArrows);
    };
  }, [spinToNextView, spinToPrevView]);

  return {
    isDragged,
    currentFrame,
    handleMouseUp,
    spinToPrevView,
    spinToNextView,
    handleMouseDown,
    handleMouseMove,
  };
};

export default useContainer;
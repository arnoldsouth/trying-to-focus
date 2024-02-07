import React, { useCallback, useEffect, useState } from 'react';

const useTimerLogic = (
  focusTime: number,
  shortBreakTime: number,
  longBreakTime: number,
  applySettingsImmediately: boolean
) => {
  const [secondsRemaining, setSecondsRemaining] = useState(focusTime * 60);
  const [currentStage, setCurrentStage] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [focusCount, setFocusCount] = useState(1);
  const [shortBreakCount, setShortBreakCount] = useState(0);
  const [longBreakCount, setLongBreakCount] = useState(0);
  const [completedCycleCount, setCompletedCycleCount] = useState(0);

  const handleNextStage = useCallback(() => {
    setIsCountingDown(false);

    let nextStage = (currentStage + 1) % 4;

    switch (nextStage) {
      case 0:
        setFocusCount(focusCount + 1);
        // setLongBreakCount(longBreakCount + 1);
        setSecondsRemaining(focusTime * 60);
        break;
      case 1:
        setShortBreakCount(shortBreakCount + 1);
        // setFocusCount(focusCount + 1);
        setSecondsRemaining(shortBreakTime * 60);
        break;
      case 2:
        setFocusCount(focusCount + 1);
        // setShortBreakCount(shortBreakCount + 1);
        setSecondsRemaining(focusTime * 60);
        break;
      case 3:
        setLongBreakCount(longBreakCount + 1);
        // setFocusCount(focusCount + 1);
        setSecondsRemaining(longBreakTime * 60);
        break;
      default:
        break;
    }

    setCurrentStage(nextStage);

    if (nextStage === 0) {
      setCompletedCycleCount(completedCycleCount + 1);
    }
  }, [
    focusCount,
    shortBreakCount,
    longBreakCount,
    currentStage,
    completedCycleCount,
    focusTime,
    shortBreakTime,
    longBreakTime,
  ]);

  useEffect(() => {
    if (applySettingsImmediately) {
      let appliedNewSeconds = 0;
      switch (currentStage) {
        case 0:
          appliedNewSeconds = focusTime * 60;
          break;
        case 1:
          appliedNewSeconds = shortBreakTime * 60;
          break;
        case 2:
          appliedNewSeconds = focusTime * 60;
          break;
        case 3:
          appliedNewSeconds = longBreakTime * 60;
          break;
        default:
          break;
      }

      setSecondsRemaining(appliedNewSeconds);
    }
  }, [
    applySettingsImmediately,
    currentStage,
    focusTime,
    shortBreakTime,
    longBreakTime,
  ]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | number | null = null;

    if (isCountingDown && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      handleNextStage();
    }

    // Clear interval when component unmounts
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCountingDown, secondsRemaining, handleNextStage]);

  const toggleTimer = () => {
    setIsCountingDown(!isCountingDown);
  };

  const timerOptions = (stage: number) => {
    setIsCountingDown(false); // Ensure timer is stopped when stage is manually changed

    let newSecondsRemaining = 0;

    switch (stage) {
      case 0:
        newSecondsRemaining = focusTime * 60;
        break;
      case 1:
        newSecondsRemaining = shortBreakTime * 60;
        break;
      case 2:
        newSecondsRemaining = focusTime * 60;
        break;
      case 3:
        newSecondsRemaining = longBreakTime * 60;
        break;
      default:
        newSecondsRemaining = focusTime * 60;
        break;
    }

    setSecondsRemaining(newSecondsRemaining);
    setCurrentStage(stage);
  };

  const stageName = () => {
    switch (currentStage) {
      case 0:
        return 'Focus Session 1';
      case 1:
        return 'Short Break';
      case 2:
        return 'Focus Session 2';
      case 3:
        return 'Long Break';
      default:
        return '';
    }
  };

  return {
    secondsRemaining,
    currentStage,
    isCountingDown,
    focusCount,
    shortBreakCount,
    longBreakCount,
    completedCycleCount,
    toggleTimer,
    timerOptions,
    handleNextStage,
    stageName,
  };
};

export default useTimerLogic;

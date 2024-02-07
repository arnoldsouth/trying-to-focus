import { useCallback, useEffect, useState } from 'react';

interface TimerProps {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  applySettingsImmediately: boolean;
}

const Timer: React.FC<TimerProps> = ({
  focusTime,
  shortBreakTime,
  longBreakTime,
  applySettingsImmediately,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(focusTime * 60);
  // Store current flow in state variable, 0 = focus time, 1 = short break, 2 = long break
  // Flow starts with 0 -> 1 -> 0 -> 2 -> back to 0
  const [currentStage, setCurrentStage] = useState(0);

  const [isFocusTime, setIsFocusTime] = useState(false);

  // const [focusCount, setFocusCount] = useState(0);
  // const [shortBreakCount, setShortBreakCount] = useState(0);
  // const [longBreakCount, setLongBreakCount] = useState(0);

  const [completedCycleCount, setCompletedCycleCount] = useState(0);

  const handleNextStage = useCallback(() => {
    setIsFocusTime(false);

    let nextStage = (currentStage + 1) % 4;

    switch (nextStage) {
      case 0:
        // setFocusCount(focusCount + 1);
        // setLongBreakCount(longBreakCount + 1);
        setSecondsRemaining(focusTime * 60);
        break;
      case 1:
        // setShortBreakCount(shortBreakCount + 1);
        // setFocusCount(focusCount + 1);
        setSecondsRemaining(shortBreakTime * 60);
        break;
      case 2:
        // setFocusCount(focusCount + 1);
        // setShortBreakCount(shortBreakCount + 1);
        setSecondsRemaining(focusTime * 60);
        break;
      case 3:
        // setLongBreakCount(longBreakCount + 1);
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
    // focusCount,
    // shortBreakCount,
    // longBreakCount,
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
    let interval: number | null = null;

    if (isFocusTime && secondsRemaining > 0) {
      interval = window.setInterval(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      handleNextStage();
    }

    // Clear interval when component unmounts
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocusTime, secondsRemaining, handleNextStage]);

  const toggleTimer = () => {
    setIsFocusTime(!isFocusTime);
  };

  const timerOptions = (stage: number) => {
    setIsFocusTime(false);

    switch (stage) {
      case 0:
        setSecondsRemaining(focusTime * 60);
        break;
      case 1:
        setSecondsRemaining(shortBreakTime * 60);
        break;
      case 2:
        setSecondsRemaining(focusTime * 60);
        break;
      case 3:
        setSecondsRemaining(longBreakTime * 60);
        break;
      default:
        break;
    }

    setCurrentStage(stage);
  };

  // Function to format time
  const formatTime = (seconds: number) => {
    const formattedMinutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;

    return `${formattedMinutes.toString().padStart(2, '0')}:${formattedSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const stage = () => {
    switch (currentStage) {
      case 0:
        return 'Focus Time 1';
      case 1:
        return 'Short Break';
      case 2:
        return 'Focus Time 2';
      case 3:
        return 'Long Break';
      default:
        return '';
    }
  };

  return (
    <div>
      <div>Timer</div>

      {/* <div>Focus Sessions: {focusCount}</div> */}
      {/* <div>Short Breaks: {shortBreakCount}</div> */}
      {/* <div>Long Breaks: {longBreakCount}</div> */}
      <div>Completed Cycles: {completedCycleCount}</div>

      <button onClick={() => timerOptions(0)}>Focus Time</button>
      <button onClick={() => timerOptions(1)}>Short Break</button>
      {/* <button onClick={() => timerOptions(2)}>Focus Time</button> */}
      <button onClick={() => timerOptions(3)}>Long Break</button>

      <div>{stage()}</div>

      <div>{formatTime(secondsRemaining)}</div>

      <button onClick={toggleTimer}>{isFocusTime ? 'Pause' : 'Start'}</button>

      <button onClick={handleNextStage} disabled={!isFocusTime}>
        Next
      </button>
    </div>
  );
};

export default Timer;

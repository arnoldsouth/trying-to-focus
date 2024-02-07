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

  const [isCountingDown, setIsCountingDown] = useState(false);

  const [focusCount, setFocusCount] = useState(1);
  const [shortBreakCount, setShortBreakCount] = useState(0);
  const [longBreakCount, setLongBreakCount] = useState(0);

  const [completedCycleCount, setCompletedCycleCount] = useState(0);

  const handleNextStage = useCallback(() => {
    setIsCountingDown(false);

    let nextStage = (currentStage + 1) % 4;

    // if (nextStage === 0) {
    //   setFocusCount(focusCount + 1); // Increment focus count at the start of each focus stage
    // }
    // if (nextStage === 1) {
    //   setShortBreakCount(shortBreakCount + 1); // Increment short break count after each short break
    // }
    // if (nextStage === 2) {
    //   setFocusCount(focusCount + 1); // Increment focus count at the start of each focus stage
    // }
    // if (nextStage === 3) {
    //   setLongBreakCount(longBreakCount + 1); // Increment long break count after each long break
    // }

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
    let interval: number | null = null;

    if (isCountingDown && secondsRemaining > 0) {
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

      <div>Focus Sessions: {focusCount}</div>
      <div>Short Breaks: {shortBreakCount}</div>
      <div>Long Breaks: {longBreakCount}</div>
      <div>Completed Cycles: {completedCycleCount}</div>

      <br />

      <div>
        <button onClick={() => timerOptions(0)}>Focus Time</button>
        <button onClick={() => timerOptions(1)}>Short Break</button>
        {/* <button onClick={() => timerOptions(2)}>Focus Time</button> */}
        <button onClick={() => timerOptions(3)}>Long Break</button>
      </div>

      <br />

      {/* <div>{stage()}</div> */}
      {stage() === 'Focus Time 1' && <div>Focus Session #{focusCount} </div>}
      {stage() === 'Short Break' && <div>Short Break #{shortBreakCount} </div>}
      {stage() === 'Focus Time 2' && <div>Focus Session #{focusCount} </div>}
      {stage() === 'Long Break' && <div>Long Break #{longBreakCount} </div>}

      <div>{formatTime(secondsRemaining)}</div>

      <div>
        <button onClick={toggleTimer}>
          {isCountingDown ? 'Pause' : 'Start'}
        </button>

        <button onClick={handleNextStage} disabled={!isCountingDown}>
          Next
        </button>

        {/* <button onClick={handleReset}>Reset</button> */}
      </div>
    </div>
  );
};

export default Timer;

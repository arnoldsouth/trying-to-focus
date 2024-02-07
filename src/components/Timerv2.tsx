import { useCallback, useEffect, useState } from 'react';

interface TimerProps {
  focusTime: number;
  shortBreak: number;
  longBreak: number;
  applySettingsImmediately: boolean;
}

const Timer: React.FC<TimerProps> = ({
  focusTime,
  shortBreak,
  longBreak,
  applySettingsImmediately,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(focusTime * 60);
  // Store current flow in state variable, 0 = focus time, 1 = short break, 2 = long break
  // Flow starts with 0 -> 1 -> 0 -> 2 -> back to 0
  const [currentFlow, setCurrentFlow] = useState(0);
  const [isFocusTime, setIsFocusTime] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const [shortBreakCount, setShortBreakCount] = useState(0);
  const [longBreakCount, setLongBreakCount] = useState(0);
  const [completedFlowCycleCount, setCompletedFlowCycleCount] = useState(0);

  const [firstStartClicked, setFirstStartClicked] = useState(false);

  const handleFlowCompletion = useCallback(() => {
    // Stops timer at beginning of each flow once Next is clicked
    setIsFocusTime(false);
    const nextFlow = (currentFlow + 1) % 4;
    setCurrentFlow(nextFlow);
    setSecondsRemaining(
      nextFlow === 0 || nextFlow === 2
        ? focusTime * 60
        : nextFlow === 1
        ? shortBreak * 60
        : longBreak * 60
    );
  }, [currentFlow, focusTime, shortBreak, longBreak]);

  useEffect(() => {
    if (applySettingsImmediately) {
      setSecondsRemaining(
        currentFlow === 0 || currentFlow === 2
          ? focusTime * 60
          : currentFlow === 1
          ? shortBreak * 60
          : longBreak * 60
      );
    }
  }, [applySettingsImmediately, currentFlow, focusTime, shortBreak, longBreak]);

  useEffect(() => {
    let interval: number | null = null;
    if (isFocusTime && secondsRemaining > 0) {
      interval = window.setInterval(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      handleFlowCompletion();
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isFocusTime, secondsRemaining, handleFlowCompletion]);

  // const toggleTimer = () => {
  //   if (!isFocusTime) {
  //     switch (currentFlow) {
  //       case 0:
  //         setFocusCount(focusCount + 1);
  //         break;
  //       case 1:
  //         setShortBreakCount(shortBreakCount + 1);
  //         break;
  //       case 2:
  //         setFocusCount(focusCount + 1);
  //         break;
  //       case 3:
  //         setLongBreakCount(longBreakCount + 1);
  //         if (completedFlowCycleCount === 0 || focusCount % 4 === 0) {
  //           setCompletedFlowCycleCount(completedFlowCycleCount + 1);
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   setIsFocusTime(!isFocusTime);
  // };

  const toggleTimer = () => {
    if (!isFocusTime) {
      if (!firstStartClicked) {
        if (currentFlow === 0) {
          setFocusCount(focusCount + 1);
        } else if (currentFlow === 2) {
          setFocusCount(focusCount + 1);
        } else if (currentFlow === 1) {
          setShortBreakCount(shortBreakCount + 1);
        } else if (currentFlow === 3) {
          setLongBreakCount(longBreakCount + 1);
          if (completedFlowCycleCount === 0 || focusCount % 2 === 0) {
            // After every 2 focus cycles
            setCompletedFlowCycleCount(completedFlowCycleCount + 1);
          }
        }

        setFirstStartClicked(true);
      }

      setIsFocusTime(true);
    } else {
      setIsFocusTime(!isFocusTime);
    }
  };

  useEffect(() => {
    // Reset firstStartClicked flag when transitioning to a new cycle phase
    setFirstStartClicked(false);
  }, [currentFlow]);

  const timerOptions = (stage: number) => {
    setIsFocusTime(false);
    // setCurrentFlow(stage);

    switch (stage) {
      case 0:
        setSecondsRemaining(focusTime * 60);
        break;
      case 2:
        setSecondsRemaining(focusTime * 60);
        break;
      case 1:
        // Resets to beginning of flow
        // setCurrentFlow(0);
        setSecondsRemaining(shortBreak * 60);
        break;
      case 3:
        // Resets to beginning of flow
        // setCurrentFlow(0);
        setSecondsRemaining(longBreak * 60);
        break;
      default:
        break;
    }
    // Stops timer
    // setIsFocusTime(false);
    setCurrentFlow(stage);
  };

  // const formatTime = (seconds: number) =>
  //   `${Math.floor(seconds / 60)
  //     .toString()
  //     .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  // const flowStage = () =>
  //   ['Focus Time I', 'Short Break', 'Focus Time II', 'Long Break'][currentFlow];

  // Create function to format time
  const formatTime = (seconds: number) => {
    const formattedMinutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;

    return `${formattedMinutes.toString().padStart(2, '0')}:${formattedSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const flowStage = () => {
    switch (currentFlow) {
      case 0:
        return 'Focus Time I';
      case 2:
        return 'Focus Time II';
      case 1:
        return 'Short Break';
      case 3:
        return 'Long Break';
      default:
        return '';
    }
  };

  return (
    <div className="timer">
      <div>Timer</div>
      <br />

      <div>Focus Sessions: {focusCount}</div>
      <div>Short Breaks: {shortBreakCount}</div>
      <div>Long Breaks: {longBreakCount}</div>
      <div>Completed Flow Cycles: {completedFlowCycleCount}</div>

      <br />

      <button onClick={() => timerOptions(0)}>Focus Time</button>
      <button onClick={() => timerOptions(1)}>Short Break</button>
      {/* <button onClick={() => timerOptions(2)}>Focus Time</button> */}
      <button onClick={() => timerOptions(3)}>Long Break</button>

      <br />

      <div>{flowStage()}</div>

      <br />

      <div>{formatTime(secondsRemaining)}</div>

      <br />

      <button onClick={toggleTimer}>{isFocusTime ? 'Pause' : 'Start'}</button>

      <button onClick={handleFlowCompletion} disabled={!isFocusTime}>
        Next
      </button>
    </div>
  );
};

export default Timer;

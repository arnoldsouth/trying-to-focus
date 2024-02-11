import React from 'react';
import useTimerLogic from '../hooks/useTimerLogic';
import { formatTime } from '../utils/formatTime';

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
  const {
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
    handleStartStage,
  } = useTimerLogic(
    focusTime,
    shortBreakTime,
    longBreakTime,
    applySettingsImmediately
  );

  return (
    <>
      <div>Timer</div>

      <div>Completed</div>
      <div>
        <div>Focus Sessions: {focusCount}</div>
        <div>Short Breaks: {shortBreakCount}</div>
        <div>Long Breaks: {longBreakCount}</div>
        <div>Cycles: {completedCycleCount}</div>
      </div>

      <br />

      <div>
        <button onClick={() => timerOptions(0)}>Focus Time 1</button>
        <button onClick={() => timerOptions(1)}>Short Break</button>
        <button onClick={() => timerOptions(2)}>Focus Time 2</button>
        <button onClick={() => timerOptions(3)}>Long Break</button>
      </div>

      <br />

      <div>{stageName()}</div>

      {/* {currentStage === 0 && <div>Focus Session 1 #{focusCount} </div>}
      {currentStage === 1 && <div>Short Break #{shortBreakCount} </div>}
      {currentStage === 2 && <div>Focus Session 2 #{focusCount} </div>}
      {currentStage === 3 && <div>Long Break #{longBreakCount} </div>} */}

      <br />

      <div>{formatTime(secondsRemaining)}</div>

      <br />

      <div>
        <button onClick={toggleTimer}>
          {isCountingDown ? 'Pause' : 'Start'}
        </button>

        <button onClick={handleNextStage} disabled={!isCountingDown}>
          Next
        </button>
      </div>
    </>
  );
};

export default Timer;

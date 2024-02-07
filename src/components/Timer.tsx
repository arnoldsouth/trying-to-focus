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
  } = useTimerLogic(
    focusTime,
    shortBreakTime,
    longBreakTime,
    applySettingsImmediately
  );

  // const stageName = () => {
  //   switch (currentStage) {
  //     case 0:
  //       return 'Focus Time 1';
  //     case 1:
  //       return 'Short Break';
  //     case 2:
  //       return 'Focus Time 2';
  //     case 3:
  //       return 'Long Break';
  //     default:
  //       return '';
  //   }
  // };

  return (
    <>
      Timer
      <div>Completed Focus Sessions: {focusCount}</div>
      <div>Completed Short Breaks: {shortBreakCount}</div>
      <div>Completed Long Breaks: {longBreakCount}</div>
      <div>Completed Cycles: {completedCycleCount}</div>
      <br />
      <div>
        <button onClick={() => timerOptions(0)}>Focus Time</button>
        <button onClick={() => timerOptions(1)}>Short Break</button>
        {/* <button onClick={() => timerOptions(2)}>Focus Time</button> */}
        <button onClick={() => timerOptions(3)}>Long Break</button>
      </div>
      <br />
      {currentStage === 0 && <div>Focus Session 1 #{focusCount} </div>}
      {currentStage === 1 && <div>Short Break #{shortBreakCount} </div>}
      {currentStage === 2 && <div>Focus Session 2 #{focusCount} </div>}
      {currentStage === 3 && <div>Long Break #{longBreakCount} </div>}
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

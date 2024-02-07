import { useState } from 'react';
import './App.css';

import Timer from './components/Timer';
import Settings from './components/Settings';

interface SettingsChangeProps {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  applySettingsImmediately: boolean;
}

const App = () => {
  const [focusTime, setFocusTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [applySettingsImmediately, setApplySettingsImmediately] =
    useState(false);

  const handleSettingsChange = (newSettings: SettingsChangeProps) => {
    setFocusTime(newSettings.focusTime);
    setShortBreakTime(newSettings.shortBreakTime);
    setLongBreakTime(newSettings.longBreakTime);
    setApplySettingsImmediately(newSettings.applySettingsImmediately);
  };

  return (
    <div className="App">
      <div>Trying to Focus</div>

      <br />

      <Settings
        focusTime={focusTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        onSettingsChange={handleSettingsChange}
      />

      <br />

      <Timer
        focusTime={focusTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        applySettingsImmediately={applySettingsImmediately}
      />
    </div>
  );
};

export default App;

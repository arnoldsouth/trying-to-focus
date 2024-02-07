import { useState } from 'react';

interface SettingsProps {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  onSettingsChange: (settings: {
    focusTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    applySettingsImmediately: boolean;
  }) => void;
}

const Settings: React.FC<SettingsProps> = ({
  focusTime,
  shortBreakTime,
  longBreakTime,
  onSettingsChange,
}) => {
  const [settingsFocusTime, setSettingsFocusTime] = useState(focusTime);
  const [settingsShortBreakTime, setSettingsShortBreakTime] =
    useState(shortBreakTime);
  const [settingsLongBreakTime, setSettingsLongBreakTime] =
    useState(longBreakTime);
  const [applySettingsImmediately, setApplySettingsImmediately] =
    useState(false);

  const handleSubmitSettingsChange = (event: React.FormEvent) => {
    event.preventDefault();
    onSettingsChange({
      focusTime: settingsFocusTime,
      shortBreakTime: settingsShortBreakTime,
      longBreakTime: settingsLongBreakTime,
      applySettingsImmediately: applySettingsImmediately,
    });
  };

  return (
    <>
      <div>Settings</div>

      <form onSubmit={handleSubmitSettingsChange}>
        <label>
          Focus Time (minutes):
          <input
            type="number"
            value={settingsFocusTime}
            onChange={(event) =>
              setSettingsFocusTime(parseInt(event.target.value, 10))
            }
          />
        </label>

        <label>
          Short Break (minutes):
          <input
            type="number"
            value={settingsShortBreakTime}
            onChange={(event) =>
              setSettingsShortBreakTime(parseInt(event.target.value, 10))
            }
          />
        </label>

        <label>
          Long Break (minutes):
          <input
            type="number"
            value={settingsLongBreakTime}
            onChange={(event) =>
              setSettingsLongBreakTime(parseInt(event.target.value, 10))
            }
          />
        </label>

        <label>
          Apply Immediately:
          <input
            type="checkbox"
            checked={applySettingsImmediately}
            onChange={(event) =>
              setApplySettingsImmediately(event.target.checked)
            }
          />
        </label>

        <button type="submit">Apply</button>
      </form>
    </>
  );
};

export default Settings;

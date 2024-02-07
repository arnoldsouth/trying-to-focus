export const formatTime = (seconds: number) => {
  const formattedMinutes = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;
  return `${formattedMinutes.toString().padStart(2, '0')}:${formattedSeconds
    .toString()
    .padStart(2, '0')}`;
};

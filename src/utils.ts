export const formatSeconds = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHrs = hrs > 0 ? hrs.toString().padStart(2, '0') : '';
  const formattedMins = mins.toString();
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${
    formattedHrs.length !== 0 ? formattedHrs + ':' : ''
  }${formattedMins}:${formattedSeconds}`;
};

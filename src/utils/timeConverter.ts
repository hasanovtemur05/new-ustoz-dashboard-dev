export const timeConverter = (time: number) => {
  if (time === 0) {
    return '-';
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);

  if (time < 60) {
    return `${time} sek`;
  } else if (time < 3600) {
    return `${minutes} min`;
  } else {
    let result = `${hours} soat`;
    if (minutes > 0) {
      result += ` ${minutes} min`;
    }
    return result;
  }
};

export function convertSecondsToHMS(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

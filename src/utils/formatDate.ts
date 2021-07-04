export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  const mins = date.getMinutes();
  return `${hour < 10 ? `0${hour}` : hour}:${mins < 10 ? `0${mins}` : mins}`;
};

export const utcFormatDate = (timestamp: number) => {
  const date = new Date(0);
  date.setUTCSeconds(timestamp);
  return date;
};

export const getFriendlyTime = (seconds: number): string => {
  const timeObject = dateDiff(seconds);

  let timeString = '';
  if (timeObject.week > 0) {
    timeString += `${timeObject.week * 7 + timeObject.day}D `;
  } else if (timeObject.day > 0) {
    timeString += `${timeObject.day}D `;
  }

  if (timeObject.hour > 0) {
    timeString += `${timeObject.hour}h `;
  }

  if (timeObject.minute > 0) {
    timeString += `${timeObject.minute}m`;
  }

  return timeString;
};

export function dateDiff(
  seconds: number,
  ...units: string[]
): {
  [key: string]: number;
} {
  let mseconds = seconds * 1000;
  return (units.length ? units : Object.keys(dateDiffDef)).reduce(
    (res: object, key: string) => {
      if (!dateDiffDef.hasOwnProperty(key))
        throw new Error('Unknown unit in dateDiff: ' + key);
      res[key] = Math.floor(mseconds / dateDiffDef[key]);
      mseconds -= res[key] * dateDiffDef[key];
      return res;
    },
    {},
  );
}

export const dateDiffDef = {
  millennium: 31536000000000,
  century: 3153600000000,
  decade: 315360000000,
  year: 31536000000,
  quarter: 7776000000,
  month: 2592000000,
  week: 604800000,
  day: 86400000,
  hour: 3600000,
  minute: 60000,
  second: 1000,
  millisecond: 1,
};

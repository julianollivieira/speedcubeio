import Box from '@/types/Box';
import Time from '@/types/Time';

// Return a good formatted time string from input time (ms)
export const msToTime = (
  ms: number | null = null,
  dash: boolean = false
): string => {
  if (dash && ms === null) return '-';
  if (ms === null) return '';
  const num = ms / 1000; // from ms to s
  const fixed = num.toFixed(2); // to string with 2 decimals
  return fixed;
};

// Return a good formatted time string from input time (ms) and return null // FIX
export const msToTimeNull = (
  ms: number | null = null,
  dash: boolean = false
): string | null => {
  if (dash && ms === null) return null;
  if (ms === null) return null;
  const num = ms / 1000; // from ms to s
  const fixed = num.toFixed(2); // to string with 2 decimals
  return fixed;
};

export const getBoxLastUseOrCreationTime = (
  box: Box | undefined
): string | undefined => {
  if (box?.times?.length) {
    return box?.times[box.times.length - 1].creationTime;
  } else {
    return box?.creationTime;
  }
};

export const sortTimeArrayByCreationTime = (
  timeArray: Array<Time>
): Array<Time> =>
  timeArray.sort(
    (a: Time, b: Time) =>
      <any>new Date(a.creationTime) - <any>new Date(b.creationTime)
  );

export const sortBoxArrayByLastUse = (
  boxArray: Array<Box> | undefined
): Array<Box> | null => {
  if (boxArray) {
    return boxArray.sort(
      (a: Box, b: Box) =>
        <any>new Date(getBoxLastUseOrCreationTime(a) ?? 0) -
        <any>new Date(getBoxLastUseOrCreationTime(b) ?? 0) // TODO: VALID FIX?
    );
  } else {
    return null;
  }
};

export const convertTimeObjectToTimeArray = (timeObject: any): Array<Time> => {
  let timeArray: Array<Time> = [];
  for (const property in timeObject) {
    timeArray.push({
      id: property,
      time: timeObject[property].time,
      puzzle: timeObject[property].puzzle,
      comment: timeObject[property].comment,
      creationTime: timeObject[property].creationTime,
    });
  }
  timeArray = sortTimeArrayByCreationTime(timeArray);
  return timeArray;
};

export const convertBoxObjectToBoxArray = (boxObject: any): Array<Box> => {
  let boxArray: Array<Box> = [];
  for (const property in boxObject) {
    boxArray.push({
      id: property,
      name: boxObject[property].name,
      icon: boxObject[property].icon,
      color: boxObject[property].color,
      creationTime: boxObject[property].creationTime,
      times: boxObject[property].times,
    });
  }
  return boxArray;
};

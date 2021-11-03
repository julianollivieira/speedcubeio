import { Box } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);

// Capitalize first letter
export const capitalizeFirstLetter = (string?: string): string | null => {
  if (!string) return null;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Return a well formatted time string from input time (ms)
export const msToTime = (
  ms: number | null = null,
  dash = false,
  showPrefix = false
): string => {
  if (dash && ms === null) return '-';
  if (ms === null) return '';

  let wasNegative = false;
  if (ms < 0) {
    wasNegative = true;
    ms = Math.abs(ms);
  }

  let result = '';

  const seconds = ms / 1000;
  if (seconds > 3600) {
    result = dayjs.utc(ms).format('H:mm:ss.SSS');
  } else if (seconds > 60) {
    result = dayjs.utc(ms).format('m:ss.SSS');
  } else {
    result = dayjs.utc(ms).format('ss.SSS');
  }

  if (showPrefix) {
    result = wasNegative ? '-' + result : '+' + result;
  }

  const rest = result.substring(0, result.length - 6);

  return `${rest}${parseFloat(result.slice(-6)).toFixed(2).padStart(5, '0')}`;
};

// TODO: CLEANUP msToTimeNull
// Return a good formatted time string from input time (ms) and return null
// export const msToTimeNull = (
//   ms: number | null = null,
//   dash: boolean = false
// ): string | null => {
//   if (dash && ms === null) return null;
//   if (ms === null) return null;
//   const num = ms / 1000; // from ms to s
//   const fixed = num.toFixed(2); // to string with 2 decimals
//   return fixed;
// };

export const getBoxLastUseOrCreationTime = (box: Box | undefined): number | undefined => {
  if (!box) return undefined;
  if (box.times?.length) {
    return box.times[box.times.length - 1].createdAt;
  } else {
    return box.createdAt;
  }
};

export const UnixEpochToUTC = (unixEpoch: number | undefined): string | undefined => {
  return unixEpoch ? dayjs.unix(unixEpoch).utc().toString() : undefined;
};

export const UnixEpochToDaysAgo = (unixEpoch: number | undefined): string | undefined => {
  return unixEpoch ? dayjs.unix(unixEpoch).utc().fromNow() : undefined;
};

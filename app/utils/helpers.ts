import { Box } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);

// Return a well formatted time string from input time (ms)
export const msToTime = (ms: number | null = null, dash = false): string => {
  if (dash && ms === null) return '-';
  if (ms === null) return '';
  const num = ms / 1000; // from ms to s
  if (num > 60) {
    return `${Math.floor(num / 60)}:${(num % 60).toFixed(2)}`; // Remainder and quotient
  } else {
    return num.toFixed(2); // to string with 2 decimals
  }
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

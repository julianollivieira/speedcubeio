// Return a good formatted time string from input time (ms)
const msToTime = (ms: number | null = null, dash: boolean): string => {
  if (dash && ms === null) return '-';
  if (ms === null) return '';
  const num = ms / 1000; // from ms to s
  const fixed = num.toFixed(2); // to string with 2 decimals
  return fixed;
};

export { msToTime };

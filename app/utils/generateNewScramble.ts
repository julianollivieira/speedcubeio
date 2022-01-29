import { Scrambow } from 'scrambow';
import type { Puzzle } from '@/types';
import type { Scramble } from 'scrambow';

const generateNewScramble = (
  scrambleLocked: boolean,
  currentPuzzle: Puzzle | undefined
): Scramble | null => {
  if (scrambleLocked || !currentPuzzle) return null;
  const arr = ['2x2x2', '3x3x3', '4x4x4', '5x5x5', '6x6x6', '7x7x7'];
  const removeLast2chars = arr.includes(currentPuzzle);
  const scrambowPuzzleType = removeLast2chars
    ? currentPuzzle.slice(0, -2)
    : currentPuzzle;

  return new Scrambow().setType(scrambowPuzzleType).get()[0];
};

export default generateNewScramble;

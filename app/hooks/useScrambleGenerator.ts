import { Scrambow } from 'scrambow';
import type { Scramble } from 'scrambow';
import { useEffect, useState } from 'react';
import { useData } from '@/hooks/useData';

const useScrambleGenerator = () => {
  const { currentPuzzle } = useData();
  const [scrambow, setScrambow] = useState<Scrambow | null>(null);
  const [scramble, setScramble] = useState<Scramble | null>(null);
  const [scrambles, setScrambles] = useState<Scramble[]>([]);

  useEffect(() => {
    const arr = ['3x3x3', '4x4x4', '5x5x5', '6x6x6', '7x7x7'];
    const removeLast2chars = arr.includes(currentPuzzle);
    const scrambowPuzzleType = removeLast2chars
      ? currentPuzzle.slice(0, -2)
      : currentPuzzle;
    setScrambow(new Scrambow(scrambowPuzzleType));
  }, [currentPuzzle]);

  const generateNewScramble = (): void => {
    if (!scrambow) return;
    const scramble = scrambow.get(1)[0];
    setScramble(scramble);
    setScrambles((prevState) => {
      prevState.push(scramble);
      return prevState;
    });
  };

  return { scramble, scrambles, generateNewScramble };
};

export default useScrambleGenerator;

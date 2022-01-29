import { Puzzle } from '@/types';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { ReactElement, useEffect } from 'react';
import puzzles from '@/utils/puzzles';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { useAtom } from 'jotai';
import { currentPuzzleAtom, timerActiveAtom } from '@/store';

const PuzzleSelector = (): ReactElement => {
  const [currentPuzzle, setCurrentPuzzle] = useAtom(currentPuzzleAtom);
  const [timerActive] = useAtom(timerActiveAtom);

  useEffect(() => {
    if (currentPuzzle === undefined) {
      setCurrentPuzzle(puzzles[1]);
    }
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel shrink={true}>Current puzzle</InputLabel>
      <Select
        value={currentPuzzle ?? ''}
        disabled={timerActive ? true : puzzles.length == 0}
        input={<OutlinedInput notched={true} label="Current puzzle"></OutlinedInput>}
        onChange={(event: SelectChangeEvent) => {
          setCurrentPuzzle(event.target.value as Puzzle);
        }}
      >
        {puzzles.map((puzzleItem: Puzzle) => (
          <MenuItem value={puzzleItem} key={puzzleItem}>
            {capitalizeFirstLetter(puzzleItem)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PuzzleSelector;

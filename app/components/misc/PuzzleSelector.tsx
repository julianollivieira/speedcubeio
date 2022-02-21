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
import { timerActiveAtom } from '@/store';

interface Props {
  currentPuzzle: Puzzle | undefined;
  onChange: (puzzle: Puzzle) => void;
}

const PuzzleSelector = ({ currentPuzzle, onChange }: Props): ReactElement => {
  const [timerActive] = useAtom(timerActiveAtom);

  useEffect(() => {
    if (currentPuzzle === undefined) {
      onChange(puzzles[1]);
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
          onChange(event.target.value as Puzzle);
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

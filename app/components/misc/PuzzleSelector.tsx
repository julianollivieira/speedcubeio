import { useData } from '@/hooks/useData';
import { Puzzle } from '@/types';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { ReactElement } from 'react';
import puzzles from '@/utils/puzzles';
import { capitalizeFirstLetter } from '@/utils/helpers';

const PuzzleSelector = (): ReactElement => {
  const { currentPuzzle, changePuzzle, timerActive } = useData();

  return (
    <FormControl fullWidth>
      <InputLabel shrink={true}>Current puzzle</InputLabel>
      <Select
        value={currentPuzzle ?? ''}
        disabled={timerActive ? true : puzzles.length == 0}
        input={<OutlinedInput notched={true} label="Current puzzle"></OutlinedInput>}
        onChange={(event: SelectChangeEvent) => {
          changePuzzle(event.target.value as Puzzle);
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

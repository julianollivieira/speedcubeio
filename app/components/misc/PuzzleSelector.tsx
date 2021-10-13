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

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PuzzleSelector = (): ReactElement => {
  const { changeBox, timerActive } = useData();

  return (
    <FormControl fullWidth>
      <InputLabel shrink={true}>Current puzzle</InputLabel>
      <Select
        disabled={timerActive ? true : puzzles.length == 0}
        input={<OutlinedInput notched={true} label="Current puzzle"></OutlinedInput>}
        onChange={(event: SelectChangeEvent) => {
          changeBox(event.target.value);
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

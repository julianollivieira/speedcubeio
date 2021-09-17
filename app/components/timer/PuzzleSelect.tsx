import { ReactElement, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import puzzles, { Puzzle } from '@/utils/puzzles';

const PuzzleSelect = (): ReactElement => {
  const [currentPuzzleId, setCurrentPuzzleId] = useState<string>(puzzles[0].id);

  const handleCurrentPuzzleIdChange = (event: any) => {
    setCurrentPuzzleId(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="box-select-label" shrink={true}>
        Current puzzle
      </InputLabel>
      <Select
        labelId="box-select-label"
        id="box-select"
        value={currentPuzzleId}
        onChange={handleCurrentPuzzleIdChange}
        input={
          <OutlinedInput notched={true} label="Current puzzle"></OutlinedInput>
        }
      >
        {puzzles?.map((puzzle: Puzzle) => (
          <MenuItem value={puzzle.id} key={puzzle.id}>
            {puzzle.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PuzzleSelect;

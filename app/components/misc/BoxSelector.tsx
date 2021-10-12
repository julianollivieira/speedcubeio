import { useData } from '@/hooks/useData';
import { Box } from '@/types';
import { FormControl, OutlinedInput, InputLabel, Select, MenuItem } from '@mui/material';
import { ReactElement, useState } from 'react';

const BoxSelector = (): ReactElement => {
  const { boxes, box, changeBox, timerActive } = useData();
  return (
    <FormControl fullWidth>
      <InputLabel shrink={true}>Current box</InputLabel>
      <Select
        value={box?.id ?? ''}
        disabled={timerActive ? true : boxes.length == 0}
        input={<OutlinedInput notched={true} label="Current box"></OutlinedInput>}
        onChange={(event) => {
          changeBox(event.target.value);
        }}
      >
        {boxes.map((boxItem: Box) => (
          <MenuItem value={boxItem.id} key={boxItem.id}>
            {boxItem.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BoxSelector;

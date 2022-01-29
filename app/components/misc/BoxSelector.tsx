import { Box } from '@/types';
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Box as MUIBox,
} from '@mui/material';
import { ReactElement } from 'react';
import { useAtom } from 'jotai';
import { boxesAtom, currentBoxIdAtom, timerActiveAtom } from '@/store';
import Link from '@/components/misc/Link';

const BoxSelector = (): ReactElement => {
  const [boxes] = useAtom(boxesAtom);
  const [currentBoxId, setCurrentBoxId] = useAtom(currentBoxIdAtom);
  const [timerActive] = useAtom(timerActiveAtom);

  return (
    <MUIBox sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel shrink={true}>Current box</InputLabel>
        <Select
          value={currentBoxId ?? boxes[0].id}
          disabled={timerActive ? true : boxes.length == 0}
          input={<OutlinedInput notched={true} label="Current box"></OutlinedInput>}
          onChange={(event) => {
            setCurrentBoxId(event.target.value);
          }}
        >
          {boxes.map((boxItem: Box) => (
            <MenuItem value={boxItem.id} key={boxItem.id}>
              {boxItem.name}
            </MenuItem>
          ))}
          {boxes.length == 0 && <MenuItem value="0">No boxes available</MenuItem>}
        </Select>
      </FormControl>
      {boxes.length == 0 && (
        <Link
          href="/boxes"
          underline="hover"
          sx={{
            fontSize: 14,
            pt: 1.5,
            textAlign: 'center',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          You don&apos;t have any boxes, click here to create one
        </Link>
      )}
    </MUIBox>
  );
};

export default BoxSelector;

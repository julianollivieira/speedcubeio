import { useAuth } from '@/hooks/useAuth';
import { Box } from '@/types';
import { FormControl, OutlinedInput, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState, ReactElement } from 'react';

interface Props {
  onChange: (boxId: string) => void;
}

const BoxSelector = ({ onChange }: Props): ReactElement => {
  const { user } = useAuth();
  const [boxId, setBoxId] = useState<string | undefined>(user?.boxes[0]?.id);

  useEffect(() => {
    if (boxId) {
      onChange(boxId);
    }
  }, [boxId]);

  return (
    <FormControl fullWidth>
      <InputLabel shrink={true}>Current box</InputLabel>
      <Select
        value={boxId}
        disabled={user?.boxes.length == 0}
        input={<OutlinedInput notched={true} label="Current box"></OutlinedInput>}
        onChange={(event) => {
          setBoxId(event.target.value);
        }}
      >
        {user?.boxes.map((box: Box) => (
          <MenuItem value={box.id} key={box.id}>
            {box.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BoxSelector;

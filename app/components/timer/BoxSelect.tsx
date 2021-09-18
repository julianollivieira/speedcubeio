import { ReactElement, useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import { useAuth } from '@/utils/auth';
import useBoxes from '@/hooks/useBoxes';
import Box from '@/types/Box';

interface Props {
  onBoxChange: (boxId: string) => void;
}

const BoxSelect = (props: Props): ReactElement => {
  const [currentBoxId, setCurrentBoxId] = useState<string>('');
  const { currentUser } = useAuth();
  const { boxes } = useBoxes(currentUser);

  const handleCurrentBoxIdChange = (boxId: string) => {
    setCurrentBoxId(boxId);
    props.onBoxChange(boxId);
  };

  useEffect(() => {
    if (currentUser && boxes !== undefined) {
      if (currentBoxId === '') {
        handleCurrentBoxIdChange(boxes[0]?.id);
      }
    }
  }, [boxes]);

  return (
    <FormControl fullWidth>
      <InputLabel id="box-select-label" shrink={true}>
        Current box
      </InputLabel>
      <Select
        disabled={boxes?.length == 0}
        labelId="box-select-label"
        id="box-select"
        value={currentBoxId}
        onChange={(event: any) => {
          handleCurrentBoxIdChange(event.target.value);
        }}
        input={
          <OutlinedInput notched={true} label="Current box"></OutlinedInput>
        }
      >
        {boxes?.map((box: Box) => (
          <MenuItem value={box.id} key={box.id}>
            {box.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BoxSelect;

import type { NextPage } from 'next';
import { ReactElement, useState } from 'react';
import { FormatListNumbered as FormatListNumberedIcon } from '@material-ui/icons';
import {
  Box as MUIBox,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import useBoxes from '@/hooks/useBoxes';
import useTimes from '@/hooks/useTimes';
import { useAuth } from '@/utils/auth';
import TimeList from '@/components/general/TimeList';
import Timer from '@/components/timer/Timer';
import Box from '@/types/Box';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
dayjs.extend(utc);

const TimerPage: NextPage = (): ReactElement => {
  const [currentBoxId, setCurrentBoxId] = useState<string>('');
  const { currentUser } = useAuth();
  const { boxes } = useBoxes(currentUser);

  console.log(`[RR 💫]   USER = ${currentUser?.uid}   BOX = ${currentBoxId}`);

  const { createTime } = useTimes(currentUser);

  useEffect(() => {
    if (currentUser && boxes !== undefined) {
      if (currentBoxId === '') {
        setCurrentBoxId(boxes[0].id);
      }
    }
  }, [boxes]);

  const handleCurrentBoxIdChange = (event: any) => {
    setCurrentBoxId(event.target.value);
  };

  const handleTimeSave = (time: number) => {
    console.log(time);
    createTime('test', time, '3b3b3', 'comment');
  };

  return (
    <UserLayout title="Timer">
      <MUIBox
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Timer onTimeFinished={handleTimeSave} />
      </MUIBox>
      <MUIBox
        sx={{
          position: 'absolute',
          top: 64,
          right: 0,
          width: 360,
          height: 'calc(100vh - 64px)',
          bgcolor: 'background.paper',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
        }}
      >
        <MUIBox sx={{ width: 1, bgcolor: '#151C24', p: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="box-select-label" shrink={true}>
              Current box
            </InputLabel>
            <Select
              labelId="box-select-label"
              id="box-select"
              value={currentBoxId}
              onChange={handleCurrentBoxIdChange}
              input={
                <OutlinedInput
                  notched={true}
                  label="Current box"
                ></OutlinedInput>
              }
            >
              {boxes?.map((box: Box) => (
                <MenuItem value={box.id} key={box.id}>
                  {box.name}
                </MenuItem>
              ))}
              {/* <MenuItem value={10}>Example 10</MenuItem>
              <MenuItem value={20}>Example 20</MenuItem> */}
            </Select>
          </FormControl>
        </MUIBox>
        <TimeList boxId={currentBoxId} sx={{ width: 1, height: 1 }} />
      </MUIBox>
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          right: 25,
          bottom: 25,
          display: { xs: 'flex', lg: 'none' },
        }}
      >
        <FormatListNumberedIcon />
      </Fab>
    </UserLayout>
  );
};

export default TimerPage;

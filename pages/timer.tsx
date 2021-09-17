import type { NextPage } from 'next';
import { ReactElement, useState } from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Box as MUIBox, Fab } from '@mui/material';
import { FormatListNumbered as FormatListNumberedIcon } from '@mui/icons-material';
import Timer from '@/components/timer/Timer';
import TimeList from '@/components/general/TimeList';
import BoxSelect from '@/components/timer/BoxSelect';
import PuzzleSelect from '@/components/timer/PuzzleSelect';

const TimerPage: NextPage = (): ReactElement => {
  const [currentBoxId, setCurrentBoxId] = useState<string>('');

  const handleBoxChange = (boxId: string) => {
    console.log(boxId, '1');
    setCurrentBoxId(boxId);
  };

  return (
    <UserLayout
      disablePadding
      title="Timer"
      sx={{
        pt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
      }}
    >
      <MUIBox>
        <MUIBox sx={{ width: 360, p: 2 }}>
          <PuzzleSelect />
        </MUIBox>
      </MUIBox>
      <MUIBox
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh', // FIX
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Timer boxId={currentBoxId} />
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
        <MUIBox
          sx={{
            width: 1,
            height: 100,
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#151C24',
            p: 2,
          }}
        >
          <BoxSelect onBoxChange={handleBoxChange} />
        </MUIBox>
        <TimeList
          boxId={currentBoxId}
          sx={{ width: 1 }}
          boxContainerProps={{
            sx: {
              height: 'calc(calc(100vh - 100px) - 64px)',
              overflowX: 'auto',
            },
          }}
        />
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

import type { NextPage } from 'next';
import { Box, Fab } from '@mui/material';
import {
  FormatListNumbered as FormatListNumberedIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import TimeListDrawer from '@/components/timelist/TimeListDrawer';
import Layout from '@/components/layout/Layout';
import Timer from '@/components/timer/Timer';
import ScrambleComponent from '@/components/timer/ScrambleComponent';
import RequireAuthenticated from '@/components/misc/RequireAuthenticated';

const TimerPage: NextPage = () => {
  const [timeListDrawerOpen, setTimeListDrawerOpen] = useState(false);

  return (
    <RequireAuthenticated>
      <Layout fluid title="Timer">
        <Box
          sx={{
            px: { lg: `${360 - 73}px` },
            width: 1,
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2.5,
              width: 1,
              height: 100,
            }}
          >
            <ScrambleComponent />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Timer />
          </Box>
          <Box sx={{ width: 1, height: 100 }}></Box>
        </Box>
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            right: 25,
            bottom: 25,
            display: { xs: 'flex', lg: 'none' },
          }}
          onClick={() => setTimeListDrawerOpen(true)}
        >
          <FormatListNumberedIcon />
        </Fab>
        {timeListDrawerOpen && (
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              right: 25,
              bottom: 25,
              display: { xs: 'flex', lg: 'none' },
              zIndex: 1300,
            }}
            onClick={() => setTimeListDrawerOpen(false)}
          >
            <ChevronRightIcon />
          </Fab>
        )}
        <TimeListDrawer
          open={timeListDrawerOpen}
          showBoxSelector
          showPuzzleSelector
          showControls
          closeDrawer={() => setTimeListDrawerOpen(false)}
        />
      </Layout>
    </RequireAuthenticated>
  );
};

export default TimerPage;

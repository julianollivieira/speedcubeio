import type { NextPage } from 'next';
import { Box, IconButton, Fab } from '@mui/material';
import {
  Visibility as VisibilityIcon,
  FormatListNumbered as FormatListNumberedIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import TimeListDrawer from '@/components/timelist/TimeListDrawer';
import Layout from '@/components/layout/Layout';
import Timer from '@/components/timer/Timer';

const TimerPage: NextPage = () => {
  const [TimeListDrawerOpen, setTimeListDrawerOpen] = useState(false);

  return (
    <Layout fluid title="Timer" isApp>
      <Box
        sx={{
          px: { lg: `${360 - 73}px` },
          width: 1,
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ width: 1, height: 100 }}></Box>
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
      <TimeListDrawer
        open={TimeListDrawerOpen}
        showBoxSelector
        showControls
        closeDrawer={() => setTimeListDrawerOpen(false)}
      />
    </Layout>
  );
};

export default TimerPage;

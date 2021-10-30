import type { NextPage } from 'next';
import { Box as MUIBox, IconButton, Fab } from '@mui/material';
import {
  Visibility as VisibilityIcon,
  FormatListNumbered as FormatListNumberedIcon,
} from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
// import BoxSelector from '@/components/misc/BoxSelector';
// import TimeList from '@/components/timer/TimeList';
import Timer from '@/components/timer/Timer';
import PuzzleSelector from '@/components/misc/PuzzleSelector';
import ScrambleComponent from '@/components/timer/ScrambleComponent';
import TimeListDrawer from '@/components/timelist/TimeListDrawer';
import { useState } from 'react';

const TimerPage: NextPage = () => {
  const [TimeListDrawerOpen, setTimeListDrawerOpen] = useState(false);

  return (
    <Layout title="Timer" isApp>
      <MUIBox sx={{ display: 'flex', pt: '64px', width: '100vw', height: '100vh' }}>
        <MUIBox
          sx={{ flex: 1, pl: { md: '240px', lg: '360px' }, pr: { md: '240px', lg: 0 } }}
        >
          <MUIBox
            sx={{
              height: 1,
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <MUIBox
              sx={{
                p: 2,
                width: 1,
                height: 100,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <MUIBox sx={{ width: { xs: 0.5, xl: 200 } }}>
                <PuzzleSelector />
              </MUIBox>
              <MUIBox sx={{ px: 3, display: { xs: 'none', xl: 'flex' } }}>
                <ScrambleComponent />
              </MUIBox>
              <MUIBox
                sx={{
                  width: { xs: 0.5, xl: 200 },
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                }}
              >
                <MUIBox>
                  <IconButton size="large">
                    <VisibilityIcon />
                  </IconButton>
                </MUIBox>
              </MUIBox>
            </MUIBox>
            <MUIBox sx={{ px: { xs: 5, md: 3 }, display: { sx: 'flex', xl: 'none' } }}>
              <ScrambleComponent />
            </MUIBox>
            <MUIBox sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <Timer />
            </MUIBox>
            <MUIBox sx={{ width: 1, height: 100 }}></MUIBox>
          </MUIBox>
        </MUIBox>
        <MUIBox
          sx={{
            width: 360,
            display: { xs: 'none', lg: 'flex' },
            // borderLeft: 1,
            // borderColor: (theme) =>
            //   theme.palette.mode === 'dark'
            //     ? 'rgba(255, 255, 255, 0.12)'
            //     : 'rgba(0, 0, 0, 0.12)',
          }}
        ></MUIBox>
        {/* <MUIBox
          sx={{
            width: 360,
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            borderLeft: 1,
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(0, 0, 0, 0.12)',
          }}
        >
          <MUIBox sx={{ p: 2, height: 100 }}>
            <BoxSelector />
          </MUIBox>
          <TimeList
            showControls
            sx={{
              bgcolor: 'background.paper',
            }}
            tableProps={{
              sx: {
                height: 'calc(100vh - 164px)',
                overflowY: 'auto',
              },
            }}
          />
        </MUIBox> */}
      </MUIBox>
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
      <TimeListDrawer open={TimeListDrawerOpen} showBoxSelector showControls />
    </Layout>
  );
};

export default TimerPage;

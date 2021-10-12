import type { NextPage } from 'next';
import { Box as MUIBox } from '@mui/material';
import Layout from '@/components/layout/Layout';
import BoxSelector from '@/components/misc/BoxSelector';
import TimeList from '@/components/timer/TimeList';
import Timer from '@/components/timer/Timer';
import PuzzleSelector from '@/components/misc/PuzzleSelector';

const TimerPage: NextPage = () => {
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
              <MUIBox>
                <PuzzleSelector />
              </MUIBox>
              <MUIBox sx={{ width: 359 }}>
                <PuzzleSelector />
              </MUIBox>
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
        </MUIBox>
      </MUIBox>
    </Layout>
  );
};

export default TimerPage;

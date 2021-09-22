import type { NextPage } from 'next';
import { useState } from 'react';
import { Box as MUIBox } from '@mui/material';
import Layout from '@/components/layout/Layout';
import BoxSelector from '@/components/misc/BoxSelector';
import TimeList from '@/components/misc/TimeList';
import Timer from '@/components/timer/Timer';
import { Box } from '@/types';
import { useAuth } from '@/hooks/useAuth';

const TimerPage: NextPage = () => {
  const [box, setBox] = useState<Box>();
  const { user } = useAuth();

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
            }}
          >
            <Timer box={box} />
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
          <MUIBox sx={{ p: 2 }}>
            <BoxSelector
              onChange={(boxId) => {
                setBox(user?.boxes.find((box: Box) => box.id === boxId));
              }}
            />
          </MUIBox>
          <TimeList
            boxId={box?.id}
            sx={{
              height: 1,
              bgcolor: 'background.paper',
            }}
          />
        </MUIBox>
      </MUIBox>
    </Layout>
  );
};

export default TimerPage;

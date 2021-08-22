import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { FormatListNumbered as FormatListNumberedIcon } from '@material-ui/icons';
import { Box, Typography, Fab } from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import useBoxes from '@/hooks/useBoxes';
import TimeList from '@/components/general/TimeList';

const Timer: NextPage = (): ReactElement => {
  const { currentUser } = useAuth();
  const { boxes } = useBoxes(currentUser);

  return (
    <UserLayout title="Timer">
      <Box
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
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Digit',
            fontSize: { xs: '8em', lg: '16em' },
          }}
        >
          00.00
        </Typography>
      </Box>
      <TimeList
        sx={{
          position: 'absolute',
          top: 64,
          right: 0,
          width: 360,
          height: 'calc(100vh - 64px)',
          bgcolor: 'background.paper',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          display: { xs: 'none', lg: 'flex' },
        }}
      />
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

export default Timer;

import type { NextPage } from 'next';
import { useAuth } from '@/utils/auth';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import {
  Typography,
  Divider,
  Avatar,
  Grid,
  Fab,
  Box as MUIBox,
} from '@material-ui/core';
import { FormatListNumbered as FormatListNumberedIcon } from '@material-ui/icons';
import UserLayout from '@/components/layout/UserLayout';
import useBox from '@/hooks/useBox';
import TimeList from '@/components/general/TimeList';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);

const Box: NextPage = (): ReactElement => {
  const router = useRouter();
  const { currentUser }: { currentUser: any } = useAuth();
  const { id } = router.query;
  const { box }: { box: any } = useBox(currentUser, id);

  return (
    <UserLayout
      title="Home"
      sx={{
        pt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px', lg: '480px' },
      }}
    >
      <MUIBox sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3">
          <Avatar
            sx={{
              bgcolor: box?.color,
              height: 75,
              width: 75,
              fontSize: '0.75em',
              mr: 3,
            }}
            variant="rounded"
          >
            {box?.icon}
          </Avatar>
        </Typography>
        <MUIBox sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h3"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {box?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', lg: 'flex-start' },
            }}
          >
            Created {dayjs(box?.creationTime).utc().fromNow()}
          </Typography>
        </MUIBox>
      </MUIBox>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TimeList
            boxId={id}
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
        </Grid>
      </Grid>
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

export default Box;

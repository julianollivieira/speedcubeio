import type { NextPage } from 'next';
import { useAuth } from '@/utils/auth';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import {
  Typography,
  Divider,
  Avatar,
  Grid,
  Fab,
  Box as MUIBox,
  IconButton,
} from '@mui/material';
import {
  Share as ShareIcon,
  Edit as EditIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { FormatListNumbered as FormatListNumberedIcon } from '@mui/icons-material';
import UserLayout from '@/components/layout/UserLayout';
import useBox from '@/hooks/useBox';
import TimeListComponent from '@/components/general/TimeList';
import TimeList from '@/classes/TimeList';
import BoxSummaryCard from '@/components/boxes/BoxSummaryCard';
import { getBoxLastUseOrCreationTime } from '@/utils/convert';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
import dynamic from 'next/dynamic';

const TimesGraphCard = dynamic(
  () => import('@/components/stat/TimesGraphCard'),
  { ssr: false }
);

const PuzzlesPieChartCard = dynamic(
  () => import('@/components/stat/PuzzlesPieChartCard'),
  { ssr: false }
);

const Box: NextPage = (): ReactElement => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { id } = router.query;
  const { box } = useBox(currentUser, id as string);

  const [timeList, setTimeList] = useState<TimeList | null>(null);
  useEffect(() => {
    // if (!box) return;
    if (!box?.times) return;
    const timeList: TimeList = new TimeList(box);
    setTimeList(timeList);
  }, [box]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const copyBoxLinkToClipboard = () => {
    navigator.clipboard
      .writeText(`https://speedcube.io/users/${currentUser?.uid}/boxes/${id}`)
      .then(
        () => {
          enqueueSnackbar('Box link copied to clipboard', {
            variant: 'success',
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)}>
                <CloseIcon />
              </IconButton>
            ),
          });
        },
        () => {
          enqueueSnackbar(
            "Something wen't wrong, profile link not copied to clipboard",
            {
              variant: 'error',
              action: (key) => (
                <IconButton onClick={() => closeSnackbar(key)}>
                  <CloseIcon />
                </IconButton>
              ),
            }
          );
        }
      );
  };

  return (
    <UserLayout
      title="Home"
      sx={{
        mt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px', lg: '480px' },
        height: 'calc(100vh - 64px)',
        overflowY: 'scroll',
      }}
    >
      <Grid container>
        <Grid item xs={12} lg={10}>
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
                Created {dayjs(box?.creationTime).utc().fromNow()} / Last used{' '}
                {dayjs(getBoxLastUseOrCreationTime(box)).utc().fromNow()}
              </Typography>
            </MUIBox>
          </MUIBox>
        </Grid>
        <Grid
          item
          xs={12}
          lg={2}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', lg: 'end' },
            pt: { xs: 3, lg: 0 },
            pr: { xs: 0, lg: 2 },
          }}
        >
          <MUIBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton onClick={copyBoxLinkToClipboard} size="large">
              <ShareIcon />
            </IconButton>
            <IconButton
              size="large"
              sx={{ display: { xs: 'none', lg: 'flex' } }}
            >
              <EditIcon />
            </IconButton>
          </MUIBox>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={12} xl={6}>
          <BoxSummaryCard timeList={timeList} />
        </Grid>
        <Grid item xs={12} sm={6} md={12} xl={6}>
          <BoxSummaryCard timeList={timeList} />
        </Grid>
        <Grid item xs={12}>
          <TimesGraphCard timeList={timeList} />
        </Grid>
        <Grid item xs={12} xl={6}>
          <PuzzlesPieChartCard timeList={timeList} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TimeListComponent
            boxId={id}
            sx={{
              position: 'fixed',
              top: 64,
              right: 20,
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
        <EditIcon />
      </Fab>
      <Fab
        color="secondary"
        sx={{
          position: 'fixed',
          right: 25,
          bottom: 100,
          display: { xs: 'flex', lg: 'none' },
        }}
      >
        <FormatListNumberedIcon />
      </Fab>
    </UserLayout>
  );
};

export default Box;

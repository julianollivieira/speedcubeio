import {
  Grid,
  Box as MUIBox,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { UnixEpochToDaysAgo, getBoxLastUseOrCreationTime } from '@/utils/helpers';
import { Box, Profile } from '@/types';
import { useData } from '@/hooks/useData';
import SummaryTableCard from '@/components/statistics/SummaryTableCard';
import EditBoxDialog from '@/components/boxes/dialogs/EditBoxDialog';
import DeleteBoxDialog from '@/components/boxes/dialogs/DeleteBoxDialog';
import TimeListComponent from '@/components/timer/TimeList';
import { ReactElement, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import Router from 'next/router';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';

interface Props {
  user: User | null | undefined;
  box: Box | undefined;
  profile: Profile | undefined;
  showControls?: boolean;
}

const BoxComponent = ({
  user,
  box,
  profile,
  showControls = false,
}: Props): ReactElement => {
  const { editBox, deleteBox, setBoxPrivate } = useData();
  const [editingBox, setEditingBox] = useState<Box | null>(null);
  const [deletingBox, setDeletingBox] = useState<Box | null>(null);
  const [visibilityLoading, setVisibilityLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (profile?.isPrivate) {
      setVisibilityLoading(true);
    }
  }, [profile]);

  const toggleVisibility = () => {
    setVisibilityLoading(true);
    setBoxPrivate(!box?.isPrivate).then((isPrivate) => {
      setVisibilityLoading(false);
      createSnackbar(
        enqueueSnackbar,
        closeSnackbar,
        `Box set to ${isPrivate ? 'private' : 'public'}`,
        'success'
      );
    });
  };

  const handleShare = () => {
    console.log(`localhost:3000/users/${user?.uid}/boxes/${box?.id}`);
  };

  return (
    <>
      <Grid container sx={{ py: 3 }}>
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
              {box ? (
                <>
                  <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center' }}>
                    {box?.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'center', lg: 'flex-start' },
                    }}
                  >
                    Created {UnixEpochToDaysAgo(box?.createdAt)} / Last used{' '}
                    {UnixEpochToDaysAgo(getBoxLastUseOrCreationTime(box))}
                    {/* {!loggedInUser ? ` / By ${user?.displayName}` : <></>} */}
                  </Typography>
                </>
              ) : (
                // <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center' }}>
                //   {!user ? 'User' : 'Box'} not found
                // </Typography>
                ''
              )}
            </MUIBox>
          </MUIBox>
        </Grid>
        {box ? (
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
              <IconButton size="large" onClick={handleShare}>
                <ShareIcon />
              </IconButton>
              {showControls && (
                <>
                  <Tooltip
                    title={
                      profile?.isPrivate
                        ? "Can't change visibility because profile is private"
                        : `Make box ${box?.isPrivate ? 'public' : 'private'}`
                    }
                  >
                    <span>
                      <IconButton
                        size="large"
                        sx={{ display: { xs: 'none', lg: 'flex' } }}
                        onClick={toggleVisibility}
                        disabled={visibilityLoading}
                      >
                        {profile?.isPrivate ? (
                          <VisibilityOffIcon />
                        ) : !box?.isPrivate ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </span>
                  </Tooltip>
                  <IconButton
                    size="large"
                    sx={{ display: { xs: 'none', lg: 'flex' } }}
                    onClick={() => setEditingBox(box ?? null)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="large"
                    sx={{ display: { xs: 'none', lg: 'flex' } }}
                    onClick={() => setDeletingBox(box ?? null)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </MUIBox>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      <Divider sx={{ mb: 3 }} />
      {box ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={12} xl={6}>
              <SummaryTableCard box={box} />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={12} xl={6}>
          <BoxSummaryCard timeList={timeList} />
        </Grid>
        <Grid item xs={12}>
          <TimesGraphCard timeList={timeList} />
        </Grid>
        <Grid item xs={12} xl={6}>
          <PuzzlesPieChartCard timeList={timeList} />
        </Grid> */}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TimeListComponent
                box={box}
                showControls={showControls}
                sx={{
                  position: 'fixed',
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
        </>
      ) : (
        ''
      )}
      {showControls && deletingBox && (
        <DeleteBoxDialog
          box={deletingBox}
          handleClose={() => setDeletingBox(null)}
          deleteBox={async (): Promise<void> => {
            await deleteBox(deletingBox.id);
            Router.push('/boxes');
          }}
        />
      )}
      {showControls && editingBox && (
        <EditBoxDialog
          box={editingBox}
          handleClose={() => setEditingBox(null)}
          editBox={async (name: string, icon: string, color: string): Promise<void> => {
            await editBox(editingBox.id, {
              name: name,
              icon: icon,
              color: color,
            });
          }}
        />
      )}
      {showControls ?? (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            right: 25,
            bottom: 25,
            display: { xs: 'flex', lg: 'none' },
          }}
          onClick={() => setEditingBox(box ?? null)}
        >
          <EditIcon />
        </Fab>
      )}
    </>
  );
};

export default BoxComponent;

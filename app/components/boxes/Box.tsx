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
  FormatListNumbered as FormatListNumberedIcon,
} from '@mui/icons-material';
import { UnixEpochToDaysAgo, getBoxLastUseOrCreationTime } from '@/utils/helpers';
import { Box, Profile } from '@/types';
import { useData } from '@/hooks/useData';
import SummaryTableCard from '@/components/statistics/SummaryTableCard';
import EditBoxDialog from '@/components/boxes/dialogs/EditBoxDialog';
import DeleteBoxDialog from '@/components/boxes/dialogs/DeleteBoxDialog';
import TimeListDrawer from '@/components/timelist/TimeListDrawer';
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
  const [TimeListDrawerOpen, setTimeListDrawerOpen] = useState(false);
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
      <MUIBox sx={{ py: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        <MUIBox
          sx={{
            pb: { xs: 3, sm: 0 },
            display: 'flex',
            justifyContent: 'center',
            width: { xs: 1, sm: '75px' },
          }}
        >
          <Typography variant="h3">
            <Avatar
              sx={{
                bgcolor: box?.color,
                height: { xs: 100, sm: 75 },
                width: { xs: 100, sm: 75 },
                fontSize: '0.75em',
              }}
              variant="rounded"
            >
              {box?.icon}
            </Avatar>
          </Typography>
        </MUIBox>
        <MUIBox
          sx={{
            width: { xs: 1, sm: 'calc(100% - 75px)' },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <MUIBox
            sx={{
              width: { xs: 1, md: 'calc(100% - 220px)' },
              pl: { xs: 0, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '2em',
                width: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: { xs: 'center', sm: 'start' },
              }}
            >
              {box?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                display: 'flex',
              }}
            >
              Created {UnixEpochToDaysAgo(box?.createdAt)} / Last used{' '}
              {UnixEpochToDaysAgo(getBoxLastUseOrCreationTime(box))}
            </Typography>
          </MUIBox>
          <MUIBox
            sx={{
              pt: { xs: 3, md: 0 },
              pr: { sm: '75px', md: 0 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-end' },
              width: { xs: 1, md: showControls ? '220px' : '75px' },
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
                <IconButton size="large" onClick={() => setEditingBox(box ?? null)}>
                  <EditIcon />
                </IconButton>
                <IconButton size="large" onClick={() => setDeletingBox(box ?? null)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </MUIBox>
        </MUIBox>
      </MUIBox>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} xl={6}>
          <SummaryTableCard box={box} />
        </Grid>
        {/* <Grid item xs={12}>
          <TimesGraphCard timeList={timeList} />
        </Grid>
        <Grid item xs={12} xl={6}>
          <PuzzlesPieChartCard timeList={timeList} />
        </Grid> */}
      </Grid>
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
      {showControls && (
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
      )}
      <TimeListDrawer
        open={TimeListDrawerOpen}
        showControls
        closeDrawer={() => setTimeListDrawerOpen(false)}
      />
    </>
  );
};

export default BoxComponent;

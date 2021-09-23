import {
  Grid,
  Box as MUIBox,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Fab,
} from '@mui/material';
import { Share as ShareIcon, Edit as EditIcon } from '@mui/icons-material';
import { UnixEpochToDaysAgo, getBoxLastUseOrCreationTime } from '@/utils/helpers';
import { User, Box } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import SummaryTableCard from '@/components/statistics/SummaryTableCard';
import EditBoxDialog from '@/components/boxes/dialogs/EditBoxDialog';
import TimeListComponent from '@/components/timer/TimeList';
import { editBox } from '@/utils/data/boxes';
import { useState } from 'react';

interface Props {
  user: User | null | undefined;
  box: Box | undefined;
  showControls?: boolean;
}

const BoxComponent = ({ user, box, showControls }: Props) => {
  const { user: loggedInUser, editBox: editBoxInState } = useAuth();
  const [editingBox, setEditingBox] = useState<Box | null>(null);

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
                Created {UnixEpochToDaysAgo(box?.creationTime.seconds)} / Last used{' '}
                {UnixEpochToDaysAgo(getBoxLastUseOrCreationTime(box))}
                {!loggedInUser ? ` / By ${user?.displayName}` : <></>}
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
            <IconButton size="large">
              <ShareIcon />
            </IconButton>
            {loggedInUser && showControls ? (
              <IconButton
                size="large"
                sx={{ display: { xs: 'none', lg: 'flex' } }}
                onClick={() => setEditingBox(box ?? null)}
              >
                <EditIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </MUIBox>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 3 }} />
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
            boxId={box?.id}
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
      {box && editingBox && loggedInUser && showControls ? (
        <EditBoxDialog
          box={box}
          handleClose={() => setEditingBox(null)}
          editBox={async (name: string, icon: string, color: string): Promise<void> => {
            await editBox(loggedInUser.id, editingBox, name, icon, color);
            editBoxInState(editingBox, name, icon, color);
          }}
        />
      ) : (
        <></>
      )}
      {loggedInUser && showControls ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default BoxComponent;

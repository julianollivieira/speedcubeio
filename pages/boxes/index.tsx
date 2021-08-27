import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement, useState, useEffect } from 'react';
import {
  Add as AddIcon,
  AllInbox as AllInboxIcon,
  Apps as AppsIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import {
  Typography,
  Divider,
  Grid,
  Box as MUIBox,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Fab,
} from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import BoxCard from '@/components/boxes/BoxCard';
import CreateBoxDialog from '@/components/boxes/CreateBoxDialog';
import DeleteBoxDialog from '@/components/boxes/DeleteBoxDialog';
import EditBoxDialog from '@/components/boxes/EditBoxDialog';
import ShareBoxDialog from '@/components/boxes/ShareBoxDialog';
import Box from '@/types/Box';
import useBoxes from '@/hooks/useBoxes';
import { sortBoxArrayByLastUse } from '@/utils/convert';

const Boxes: NextPage = (): ReactElement => {
  const { currentUser } = useAuth();
  const { boxes, createBox, editBox, deleteBox } = useBoxes(currentUser);

  const [view, setView] = useState<string | null>('grid');
  const handleChangeView = (_: any, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<string | null>(null);
  const [openShareDialog, setOpenShareDialog] = useState<string | null>(null);

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleOpenDeleteDialog = (boxId: string) => setOpenDeleteDialog(boxId);
  const handleOpenEditDialog = (boxId: string) => setOpenEditDialog(boxId);
  const handleOpenShareDialog = (boxId: string) => setOpenShareDialog(boxId);

  const handleCloseCreateDialog = () => setOpenCreateDialog(false);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(null);
  const handleCloseEditDialog = () => setOpenEditDialog(null);
  const handleCloseShareDialog = () => setOpenShareDialog(null);

  return (
    <UserLayout
      title="Home"
      sx={{
        pt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
      }}
    >
      <CreateBoxDialog
        open={openCreateDialog}
        handleClose={handleCloseCreateDialog}
        createBox={createBox}
      />
      <DeleteBoxDialog
        boxId={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        deleteBox={deleteBox}
      />
      <EditBoxDialog
        boxId={openEditDialog}
        handleClose={handleCloseEditDialog}
        editBox={editBox}
      />
      <ShareBoxDialog
        boxId={openShareDialog}
        handleClose={handleCloseShareDialog}
      />
      <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center' }}>
        <AllInboxIcon sx={{ fontSize: '1em', mr: 2 }} />
        Your boxes
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Grid container sx={{ my: 3 }}>
        <Grid
          item
          xs={4}
          sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ height: 'fit-content' }}
            onClick={handleOpenCreateDialog}
          >
            Create box
          </Button>
        </Grid>
        <Grid item xs={8} lg={4}>
          <MUIBox sx={{ display: 'flex', alignItems: 'flex-end', width: 1 }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              label="Search for boxes"
              variant="standard"
              sx={{ width: 1 }}
            />
          </MUIBox>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleChangeView}
          >
            <ToggleButton value="grid">
              <AppsIcon />
            </ToggleButton>
            <ToggleButton value="list">
              <FormatListBulletedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {sortBoxArrayByLastUse(boxes)
          ?.reverse()
          .map((box: Box) => (
            <Grid item xs={12} sm={6} md={12} lg={6} xl={3} key={box.id}>
              <BoxCard
                box={box}
                openDeleteDialog={handleOpenDeleteDialog}
                openEditDialog={handleOpenEditDialog}
                openShareDialog={handleOpenShareDialog}
              />
            </Grid>
          ))}
      </Grid>
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          right: 25,
          bottom: 25,
          display: { xs: 'flex', lg: 'none' },
        }}
        onClick={handleOpenCreateDialog}
      >
        <AddIcon />
      </Fab>
    </UserLayout>
  );
};

export default Boxes;

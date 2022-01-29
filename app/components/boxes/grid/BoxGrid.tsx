import { useState, ReactElement } from 'react';
import { User } from 'firebase/auth';
import { Box } from '@/types';
import { Grid, Typography } from '@mui/material';
import BoxCard from '@/components/boxes/card/BoxCard';
import BoxGridToolbar from '@/components/boxes/grid/BoxGridToolbar';
import CreateBoxDialog from '@/components/boxes/dialogs/CreateBoxDialog';
import DeleteBoxDialog from '@/components/boxes/dialogs/DeleteBoxDialog';
import EditBoxDialog from '@/components/boxes/dialogs/EditBoxDialog';
import type { Profile } from '@/types';

interface Props {
  user: User | null | undefined;
  profile: Profile | null;
  boxes: Box[];
  showControls?: boolean;
}

const BoxGrid = ({ user, boxes, profile, showControls = false }: Props): ReactElement => {
  const [searchString, setSearchString] = useState<string | null>();
  const [creatingBox, setCreatingBox] = useState(false);
  const [deletingBox, setDeletingBox] = useState<Box | null>(null);
  const [editingBox, setEditingBox] = useState<Box | null>(null);

  const boxCards = boxes.map((box) => (
    <Grid xs={12} lg={6} xl={4} item key={box.id}>
      <BoxCard
        user={user}
        box={box}
        showControls={showControls}
        openDeleteBoxDialog={() => setDeletingBox(box)}
        openEditBoxDialog={() => setEditingBox(box)}
        share={() => console.log(`localhost:3000/users/${user?.uid}/boxes/${box.id}`)}
      />
    </Grid>
  ));

  const results = boxCards.filter((boxCard) =>
    boxCard.props.children.props.box.name
      .toLowerCase()
      .includes(searchString?.toLowerCase() ?? '')
  );

  return (
    <>
      <BoxGridToolbar
        showControls={showControls}
        handleSearchInput={(searchString) => setSearchString(searchString.target.value)}
        handleOpenCreateDialog={() => setCreatingBox(true)}
      />
      {user && profile && (
        <>
          {profile !== null && boxes.length === 0 && 'No boxes'}
          <Grid container spacing={2}>
            {results.length > 0 ? (
              results
            ) : (
              <Grid xs={12} sx={{ pt: 8, display: 'flex', justifyContent: 'center' }}>
                <Typography>No boxes found</Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
      {user === null && 'User not found'}
      {user && profile === null && 'Profile is private'}
      {showControls && (
        <>
          <CreateBoxDialog open={creatingBox} handleClose={() => setCreatingBox(false)} />
          {deletingBox && (
            <DeleteBoxDialog box={deletingBox} handleClose={() => setDeletingBox(null)} />
          )}
          {editingBox && (
            <EditBoxDialog box={editingBox} handleClose={() => setEditingBox(null)} />
          )}
        </>
      )}
    </>
  );
};

export default BoxGrid;

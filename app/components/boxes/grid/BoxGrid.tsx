import { useState, ReactElement } from 'react';
import { User } from 'firebase/auth';
import { Box } from '@/types';
import { Grid, Typography } from '@mui/material';
import BoxCard from '@/components/boxes/card/BoxCard';
import BoxGridToolbar from '@/components/boxes/grid/BoxGridToolbar';
import CreateBoxDialog from '@/components/boxes/dialogs/CreateBoxDialog';
import EditBoxDialog from '@/components/boxes/dialogs/EditBoxDialog';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import type { Profile } from '@/types';
import deleteBox from '@/services/boxes/deleteBox';
import { useAtom } from 'jotai';
import { boxesAtom } from '@/store';
import { deleteBoxFromBoxArray } from '@/utils/state';

interface Props {
  user: User | null | undefined;
  profile: Profile | null | undefined;
  boxes: Box[];
  showControls?: boolean;
}

const BoxGrid = ({ user, boxes, profile, showControls = false }: Props): ReactElement => {
  const [searchString, setSearchString] = useState<string | null>();
  const [creatingBox, setCreatingBox] = useState(false);
  const [deletingBox, setDeletingBox] = useState<Box | null>(null);
  const [editingBox, setEditingBox] = useState<Box | null>(null);

  const [, setBoxes] = useAtom(boxesAtom);

  const boxCards = boxes.map((box) => (
    <Grid xs={12} lg={6} xl={4} item key={box.id}>
      <BoxCard
        user={user}
        box={box}
        showControls={showControls}
        setDeletingBox={setDeletingBox}
        setEditingBox={setEditingBox}
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
          {deletingBox && user && (
            <DeleteDialog
              open={!!deletingBox}
              title="Delete box"
              content="Are you sure you want to delete this box?"
              successMessage="Box deleted succesfully"
              handleClose={() => setDeletingBox(null)}
              handleDelete={async () => {
                await deleteBox(user, deletingBox.id);
                setBoxes(deleteBoxFromBoxArray(boxes, deletingBox.id));
              }}
            />
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

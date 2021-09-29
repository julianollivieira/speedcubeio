import { useState } from 'react';
import { Box, User } from '@/types';
import { Typography, Grid } from '@mui/material';
import BoxCard from '@/components/boxes/card/BoxCard';
import BoxGridToolbar from '@/components/boxes/grid/BoxGridToolbar';
import CreateBoxDialog from '@/components/boxes/dialogs/CreateBoxDialog';
import DeleteBoxDialog from '@/components/boxes/dialogs/DeleteBoxDialog';
import EditBoxDialog from '@/components/boxes/dialogs/EditBoxDialog';
import { createBox, deleteBox, editBox } from '@/utils/data/boxes';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  user: User | null | undefined;
  showControls: boolean;
}

const BoxGrid = ({ user, showControls }: Props) => {
  const [searchString, setSearchString] = useState<string | null>();
  const [view, setView] = useState<string | null>('grid');

  const handleChangeView = (event: any, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const {
    addBox: addBoxToState,
    deleteBox: deleteBoxFromState,
    editBox: editBoxInState,
  } = useAuth();

  const [creatingBox, setCreatingBox] = useState(false);
  const [deletingBox, setDeletingBox] = useState<Box | null>(null);
  const [editingBox, setEditingBox] = useState<Box | null>(null);

  return (
    <>
      <BoxGridToolbar
        user={user}
        showControls={showControls}
        view={view}
        handleChangeView={handleChangeView}
        handleSearchInput={(searchString) => setSearchString(searchString.target.value)}
        handleOpenCreateDialog={() => setCreatingBox(true)}
      />
      {view === 'grid' ? (
        <Grid container spacing={2}>
          {user?.boxes.map((box) => (
            <Grid item xs={12} sm={6} md={12} lg={6} xl={3} key={box.id}>
              <BoxCard
                box={box}
                showControls={showControls}
                openDeleteBoxDialog={() => setDeletingBox(box)}
                openEditBoxDialog={() => setEditingBox(box)}
                share={() =>
                  console.log(`localhost:3000/users/${user.id}/boxes/${box.id}`)
                }
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>List view here / seachString: {searchString}</Typography>
      )}
      {user?.id ? (
        <CreateBoxDialog
          open={creatingBox}
          handleClose={() => setCreatingBox(false)}
          createBox={async (name: string, icon: string, color: string): Promise<void> => {
            const boxDocument = await createBox(user.id, name, icon, color);
            addBoxToState({
              id: boxDocument.id,
              times: [],
              ...boxDocument.data(),
            } as unknown as Box);
          }}
        />
      ) : (
        <></>
      )}
      {user?.id && deletingBox ? (
        <DeleteBoxDialog
          box={deletingBox}
          handleClose={() => setDeletingBox(null)}
          deleteBox={async (): Promise<void> => {
            await deleteBox(user.id, deletingBox);
            deleteBoxFromState(deletingBox);
          }}
        />
      ) : (
        <></>
      )}
      {user?.id && editingBox ? (
        <EditBoxDialog
          box={editingBox}
          handleClose={() => setEditingBox(null)}
          editBox={async (name: string, icon: string, color: string): Promise<void> => {
            await editBox(user.id, editingBox, name, icon, color);
            editBoxInState(editingBox, name, icon, color);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default BoxGrid;

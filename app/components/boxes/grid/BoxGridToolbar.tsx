import { Fab, Box, Grid, Button, TextField, Typography, Card } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { ChangeEventHandler, ReactElement } from 'react';
import { boxesAtom } from '@/store';
import { useAtom } from 'jotai';

interface Props {
  showControls: boolean;
  handleOpenCreateDialog?: () => void;
  handleSearchInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const BoxGridToolbar = ({
  showControls,
  handleOpenCreateDialog,
  handleSearchInput,
}: Props): ReactElement => {
  const [boxes] = useAtom(boxesAtom);

  return (
    <>
      <Grid container sx={{ mb: 4 }}>
        {showControls ? (
          <Grid
            item
            xs={3}
            sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'flex-end' }}
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
        ) : (
          <></>
        )}
        <Grid item xs={12} sm={8} lg={showControls ? 6 : 8}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              width: 1,
            }}
          >
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              label="Search for boxes"
              variant="standard"
              onChange={handleSearchInput}
              sx={{ width: 1 }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          lg={3}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <Card
            sx={{
              height: '36.5px',
              px: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>Box count: {boxes.length}</Typography>
          </Card>
        </Grid>
      </Grid>
      {showControls ? (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            zIndex: 1,
            right: 25,
            bottom: 25,
            display: { xs: 'flex', lg: 'none' },
          }}
          onClick={handleOpenCreateDialog}
        >
          <AddIcon />
        </Fab>
      ) : (
        <></>
      )}
    </>
  );
};

export default BoxGridToolbar;

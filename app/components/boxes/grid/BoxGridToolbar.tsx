import {
  Fab,
  Box,
  Grid,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Apps as AppsIcon,
  FormatListBulleted as FormatListBulletedIcon,
} from '@mui/icons-material';
import { ChangeEventHandler, ReactElement } from 'react';
import { User } from '@/types';

interface Props {
  user: User | null | undefined;
  showControls: boolean;
  view: string | null;
  handleOpenCreateDialog?: () => void;
  handleChangeView: (event: any, newView: string | null) => void;
  handleSearchInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const BoxGridToolbar = ({
  user,
  showControls,
  view,
  handleOpenCreateDialog,
  handleChangeView,
  handleSearchInput,
}: Props): ReactElement => {
  return (
    <>
      <Grid container sx={{ my: 3 }}>
        {showControls ? (
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
        ) : (
          <></>
        )}
        <Grid item xs={8} lg={showControls ? 4 : 8}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 1 }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              label="Search for boxes"
              variant="standard"
              onChange={handleSearchInput}
              sx={{ width: 1 }}
            />
          </Box>
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

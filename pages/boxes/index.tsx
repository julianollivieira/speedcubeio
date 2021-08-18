import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement, useEffect, useState } from 'react';
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
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Fab,
} from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import BoxCard from '@/components/boxes/BoxCard';
import useBoxes from '@/hooks/useBoxes';

const Boxes: NextPage = (): ReactElement => {
  const { currentUser } = useAuth();
  const { boxes } = useBoxes(currentUser);

  const [view, setView] = useState<string | null>('grid');
  const handleChangeView = (_: any, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <UserLayout title="Home">
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
          >
            Create box
          </Button>
        </Grid>
        <Grid item xs={8} lg={4}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 1 }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              label="Search for boxes"
              variant="standard"
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
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {boxes?.map((box: any) => (
          <Grid item xs={12} sm={6} lg={3} key={box.key}>
            <BoxCard box={box.box} />
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
      >
        <AddIcon />
      </Fab>
    </UserLayout>
  );
};

export default Boxes;

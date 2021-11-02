import { ReactElement, useState } from 'react';
import { Box, Typography, ButtonGroup, Button } from '@mui/material';
import {
  History as HistoryIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  ContentCopy as ContentCopyIcon,
  Cached as CachedIcon,
} from '@mui/icons-material';
import { useData } from '@/hooks/useData';
import ScrambleHistoryDialog from './dialogs/ScrambleHistoryDialog';

const ScrambleComponent = (): ReactElement => {
  const { scramble, generateNewScramble } = useData();
  const [scrambleHistoryOpen, setScrambleHistoryOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'start',
        }}
      >
        <Typography
          variant="h4"
          color="textPrimary"
          sx={{
            textAlign: 'center',
            fontSize: { xs: 20, sm: 20, md: 20, lg: 20, xl: 30 },
          }}
        >
          {scramble?.scramble_string}
        </Typography>
        <ButtonGroup
          sx={{ mt: 2 }}
          color="secondary"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => setScrambleHistoryOpen(true)}>
            <HistoryIcon />
          </Button>
          <Button>
            <EditIcon />
          </Button>
          <Button>
            <LockIcon />
          </Button>
          <Button>
            <ContentCopyIcon />
          </Button>
          <Button onClick={generateNewScramble}>
            <CachedIcon />
          </Button>
        </ButtonGroup>
      </Box>
      <ScrambleHistoryDialog
        open={scrambleHistoryOpen}
        handleClose={() => setScrambleHistoryOpen(false)}
      />
    </>
  );
};

export default ScrambleComponent;

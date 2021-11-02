import { ReactElement, useState } from 'react';
import { Box, Typography, ButtonGroup, Button, Tooltip } from '@mui/material';
import {
  History as HistoryIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  ContentCopy as ContentCopyIcon,
  Cached as CachedIcon,
  LockOpen as LockOpenIcon,
} from '@mui/icons-material';
import { useData } from '@/hooks/useData';
import ScrambleHistoryDialog from './dialogs/ScrambleHistoryDialog';

const ScrambleComponent = (): ReactElement => {
  const { scramble, scrambleLocked, generateNewScramble, toggleScrambleLocked } =
    useData();
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
          <Tooltip title="View scramble history">
            <Button onClick={() => setScrambleHistoryOpen(true)}>
              <HistoryIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Edit scramble">
            <Button>
              <EditIcon />
            </Button>
          </Tooltip>
          <Tooltip title={scrambleLocked ? 'Unlock scramble' : 'Lock scramble'}>
            <Button onClick={toggleScrambleLocked}>
              {scrambleLocked ? <LockOpenIcon /> : <LockIcon />}
            </Button>
          </Tooltip>
          <Tooltip title="Copy scramble">
            <Button>
              <ContentCopyIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Generate new scramble">
            <Button onClick={generateNewScramble}>
              <CachedIcon />
            </Button>
          </Tooltip>
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

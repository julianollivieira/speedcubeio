import { ReactElement, useEffect, useState } from 'react';
import { Box, Typography, ButtonGroup, Button, Tooltip } from '@mui/material';
import {
  History as HistoryIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  ContentCopy as ContentCopyIcon,
  Cached as CachedIcon,
  LockOpen as LockOpenIcon,
} from '@mui/icons-material';
import ScrambleHistoryDialog from './dialogs/ScrambleHistoryDialog';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import { useAtom } from 'jotai';
import { scrambleAtom, scrambleLockedAtom, currentPuzzleAtom } from '@/store';
import generateNewScramble from '@/utils/generateNewScramble';

const ScrambleComponent = (): ReactElement => {
  const [scramble, setScramble] = useAtom(scrambleAtom);
  const [scrambleLocked, setScrambleLocked] = useAtom(scrambleLockedAtom);
  const [currentPuzzle] = useAtom(currentPuzzleAtom);

  const [scrambleHistoryOpen, setScrambleHistoryOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const newScramble = generateNewScramble(scrambleLocked, currentPuzzle);
    if (!newScramble) return;
    setScramble(newScramble);
  }, [currentPuzzle]);

  const handleToggleScrambleLockClick = (): void => {
    setScrambleLocked(!scrambleLocked);
    createSnackbar(
      enqueueSnackbar,
      closeSnackbar,
      `Scramble ${scrambleLocked ? 'unlocked' : 'locked'}`,
      'success'
    );
  };

  const handleGenerateNewScrambleClick = (): void => {
    const newScramble = generateNewScramble(scrambleLocked, currentPuzzle);
    if (!newScramble) return;
    setScramble(newScramble);
  };

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
          <Tooltip title={`${scrambleLocked ? 'Unlock' : 'Lock'} scramble`}>
            <Button onClick={handleToggleScrambleLockClick}>
              {scrambleLocked ? <LockOpenIcon /> : <LockIcon />}
            </Button>
          </Tooltip>
          <Tooltip title="Copy scramble">
            <Button>
              <ContentCopyIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Generate new scramble">
            <Button onClick={handleGenerateNewScrambleClick}>
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

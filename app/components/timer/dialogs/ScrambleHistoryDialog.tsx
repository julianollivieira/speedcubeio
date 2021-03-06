import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import { useAtom } from 'jotai';
import { scrambleHistoryAtom, scrambleAtom } from '@/store';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ScrambleHistoryDialog = ({ open, handleClose }: Props): ReactElement => {
  const [scrambleHistory] = useAtom(scrambleHistoryAtom);
  const [, setScramble] = useAtom(scrambleAtom);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const setPreviousScramble = (scrambleId: number) => {
    setScramble(scrambleHistory[scrambleId].scramble);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: 'background.paper' }}>Scramble history</DialogTitle>
      <DialogContent dividers sx={{ bgcolor: '#151C24', p: 0 }}>
        <List
          sx={{
            width: '100%',
            maxWidth: 720,
            maxHeight: 360,
          }}
        >
          {scrambleHistory
            .map((scramble, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => {
                    setPreviousScramble(index);
                    createSnackbar(
                      enqueueSnackbar,
                      closeSnackbar,
                      'Scramble updated succesfully',
                      'success'
                    );
                    handleClose();
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{index + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={scramble.scramble.scramble_string}
                    secondary={scramble.puzzle}
                  />
                </ListItemButton>
              </ListItem>
            ))
            .reverse()}
        </List>
      </DialogContent>
      <DialogActions
        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body2" sx={{ px: 1 }}>
          Click on a scramble to set it as active
        </Typography>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScrambleHistoryDialog;

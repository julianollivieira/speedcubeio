import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  LinearProgress,
} from '@mui/material';
import { Box } from '@/types';
import { useState, ReactElement } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import deleteBox from '@/services/boxes/deleteBox';
import { useAtom } from 'jotai';
import { userAtom, boxesAtom, currentBoxIdAtom } from '@/store';

interface Props {
  box: Box;
  handleClose: () => void;
  onDelete?: () => void;
}

const DeleteBoxDialog = ({ box, handleClose, onDelete }: Props): ReactElement => {
  const [user] = useAtom(userAtom);
  const [boxes, setBoxes] = useAtom(boxesAtom);
  const [currentBoxId, setCurrentBoxId] = useAtom(currentBoxIdAtom);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Dialog open={!!box} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: 'background.paper' }}>Delete box</DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 1, bgcolor: 'background.paper' }}>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this box?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="contained"
          onClick={async () => {
            setLoading(true);
            deleteBox(user!, box.id)
              .then(() => {
                setBoxes(boxes.filter((b) => b.id !== box.id));
                if (currentBoxId == box.id) setCurrentBoxId(undefined);
                createSnackbar(
                  enqueueSnackbar,
                  closeSnackbar,
                  'Box deleted succesfully',
                  'success'
                );
                handleClose();
                setLoading(false);
                if (onDelete) onDelete();
              })
              .catch(() => {
                createSnackbar(
                  enqueueSnackbar,
                  closeSnackbar,
                  "Something wen't wrong, please try again",
                  'error'
                );
                setLoading(false);
              });
          }}
        >
          Delete
        </Button>
      </DialogActions>
      {loading && (
        <LinearProgress
          sx={{
            width: 1,
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          }}
        />
      )}
    </Dialog>
  );
};

export default DeleteBoxDialog;

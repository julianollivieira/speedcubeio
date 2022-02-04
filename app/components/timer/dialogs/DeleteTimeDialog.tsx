import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  LinearProgress,
} from '@mui/material';
import { Time } from '@/types';
import { useState, ReactElement } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import { useAtom } from 'jotai';
import { userAtom, currentBoxIdAtom, boxesAtom } from '@/store';
import deleteTime from '@/services/times/deleteTime';

interface Props {
  time: Time | null | undefined;
  handleClose: () => void;
  onDelete: () => void;
}

const DeleteTimeDialog = ({ time, handleClose, onDelete }: Props): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [user] = useAtom(userAtom);
  const [boxes, setBoxes] = useAtom(boxesAtom);
  const [currentBoxId] = useAtom(currentBoxIdAtom);

  return (
    <Dialog open={!!time} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: 'background.paper' }}>Delete time</DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 1, bgcolor: 'background.paper' }}>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this time?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={async () => {
            if (!user || !currentBoxId || !time) return;
            setLoading(true);
            deleteTime(user, currentBoxId, time.id)
              .then(() => {
                setBoxes(
                  boxes.map((box) => {
                    if (box.id === currentBoxId) {
                      box.times = box.times.filter((t) => t.id !== time.id);
                    }
                    return box;
                  })
                );
                createSnackbar(
                  enqueueSnackbar,
                  closeSnackbar,
                  'Time deleted succesfully',
                  'success'
                );
                handleClose();
                onDelete();
              })
              .catch(() => {
                createSnackbar(
                  enqueueSnackbar,
                  closeSnackbar,
                  "Something wen't wrong, please try again",
                  'error'
                );
              });
            setLoading(false);
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

export default DeleteTimeDialog;

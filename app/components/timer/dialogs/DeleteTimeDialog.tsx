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
import { useState } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';

interface Props {
  time: Time | null | undefined;
  handleClose: () => void;
  deleteTime: () => Promise<void>;
}

const DeleteTimeDialog = ({ time, handleClose, deleteTime }: Props) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Dialog open={!!time} onClose={handleClose}>
      <DialogTitle>Delete time</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this time?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={async () => {
            try {
              setLoading(true);
              await deleteTime();
              createSnackbar(
                enqueueSnackbar,
                closeSnackbar,
                'Time deleted succesfully',
                'success'
              );
              handleClose();
              setLoading(false);
            } catch (error) {
              setLoading(false);
              createSnackbar(
                enqueueSnackbar,
                closeSnackbar,
                "Something wen't wrong, please try again",
                'error'
              );
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
      {loading ? (
        <LinearProgress
          sx={{
            width: 1,
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          }}
        />
      ) : (
        <></>
      )}
    </Dialog>
  );
};

export default DeleteTimeDialog;

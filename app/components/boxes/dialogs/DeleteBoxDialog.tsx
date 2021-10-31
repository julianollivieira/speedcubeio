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

interface Props {
  box: Box | null | undefined;
  handleClose: () => void;
  deleteBox: () => Promise<void>;
}

const DeleteBoxDialog = ({ box, handleClose, deleteBox }: Props): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Dialog open={!!box} onClose={handleClose}>
      <DialogTitle>Delete box</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this box?
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
              await deleteBox();
              createSnackbar(
                enqueueSnackbar,
                closeSnackbar,
                'Box deleted succesfully',
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

export default DeleteBoxDialog;

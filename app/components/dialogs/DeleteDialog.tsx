import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  LinearProgress,
} from '@mui/material';
import { useState, ReactElement, ReactNode } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => Promise<void>;
  onSuccess?: () => void;
  title: ReactNode;
  content: ReactNode;
  successMessage: string;
}

const DeleteDialog = ({
  open,
  handleClose,
  handleDelete,
  onSuccess,
  title,
  content,
  successMessage,
}: Props): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: 'background.paper' }}>{title}</DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 1, bgcolor: 'background.paper' }}>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            try {
              await handleDelete();
              createSnackbar(enqueueSnackbar, closeSnackbar, successMessage, 'success');
              onSuccess?.();
              handleClose();
            } catch (error) {
              createSnackbar(
                enqueueSnackbar,
                closeSnackbar,
                "Something wen't wrong, please try again",
                'error'
              );
            }
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

export default DeleteDialog;

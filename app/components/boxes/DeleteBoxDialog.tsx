import { ReactElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Box from '@/types/Box';
import { useSnackbar } from 'notistack';

interface Props {
  box: Box | null;
  handleClose: () => void;
  deleteBox: any;
}

const DeleteBoxDialog = (props: Props): ReactElement => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDelete = () => {
    try {
      props.handleClose();
      props.deleteBox(props.box?.id);
      enqueueSnackbar('Box deleted successfully', {
        variant: 'success',
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    } catch (error) {
      console.log('error', error);
      enqueueSnackbar("Something wen't wrong, please try again", {
        variant: 'error',
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  };
  return (
    <Dialog open={Boolean(props.box?.id)} onClose={props.handleClose}>
      <DialogTitle>Delete box</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this box?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBoxDialog;

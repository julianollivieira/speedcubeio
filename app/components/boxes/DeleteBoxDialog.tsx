import { ReactElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material';
import Box from '@/types/Box';

interface Props {
  box: Box | null;
  handleClose: () => void;
  deleteBox: any;
}

const DeleteBoxDialog = (props: Props): ReactElement => {
  const handleDelete = () => {
    props.handleClose();
    props.deleteBox(props.box?.id);
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

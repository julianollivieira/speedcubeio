import { ReactElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@material-ui/core';

interface Props {
  boxId: string | null;
  handleClose: () => void;
  deleteBox: any;
}

const DeleteBoxDialog = (props: Props): ReactElement => {
  const handleDelete = () => {
    props.handleClose();
    props.deleteBox(props.boxId);
  };
  return (
    <Dialog open={Boolean(props.boxId)} onClose={props.handleClose}>
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

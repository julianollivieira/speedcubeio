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
  open: string | null;
  handleClose: any;
}

const ShareBoxDialog = (props: Props): ReactElement => {
  // const handleDelete = () => {
  //   props.handleClose();
  //   props.deleteBox('id_here');
  // };
  return (
    <Dialog open={Boolean(props.open)} onClose={props.handleClose}>
      <DialogTitle>{props.open}</DialogTitle>
      {/* <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete your box?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default ShareBoxDialog;

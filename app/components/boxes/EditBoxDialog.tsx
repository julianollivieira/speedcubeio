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
  editBox: any;
}

const EditBoxDialog = (props: Props): ReactElement => {
  // const handleDelete = () => {
  //   props.handleClose();
  //   props.deleteBox('id_here');
  // };
  return (
    <Dialog open={Boolean(props.boxId)} onClose={props.handleClose}>
      <DialogTitle>{props.boxId}</DialogTitle>
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

export default EditBoxDialog;

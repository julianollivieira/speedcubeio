import { ReactElement } from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';

interface Props {
  boxId: string | null;
  handleClose: () => void;
}

const ShareBoxDialog = (props: Props): ReactElement => {
  return (
    <Dialog open={Boolean(props.boxId)} onClose={props.handleClose}>
      <DialogTitle>{props.boxId}</DialogTitle>
    </Dialog>
  );
};

export default ShareBoxDialog;

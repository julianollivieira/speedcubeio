import { ReactElement } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import Box from '@/types/Box';

interface Props {
  box: Box | null;
  handleClose: () => void;
}

const ShareBoxDialog = (props: Props): ReactElement => {
  return (
    <Dialog open={Boolean(props.box?.id)} onClose={props.handleClose}>
      <DialogTitle>{props.box?.id}</DialogTitle>
    </Dialog>
  );
};

export default ShareBoxDialog;

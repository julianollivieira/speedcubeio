import { OptionsObject, SnackbarKey, SnackbarMessage, VariantType } from 'notistack';
import IconButton from '@mui/material/IconButton';
import { Close as CloseIcon } from '@mui/icons-material';

const createSnackbar = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
  closeSnackbar: (key?: SnackbarKey | undefined) => void,
  message: SnackbarMessage,
  variant: VariantType
): SnackbarKey =>
  enqueueSnackbar(message, {
    variant: variant,
    action: (key) => (
      <IconButton onClick={() => closeSnackbar(key)}>
        <CloseIcon />
      </IconButton>
    ),
  });

export default createSnackbar;

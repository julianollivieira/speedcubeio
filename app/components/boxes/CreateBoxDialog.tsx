import { ReactElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ColorPicker from '@/components/general/ColorPicker';
import boxSchema from '@/validation/box';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

interface Props {
  open: boolean;
  handleClose: () => void;
  createBox: any;
}

const CreateBoxDialog = (props: Props): ReactElement => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClose = () => {
    formik.resetForm();
    props.handleClose();
  };

  const formik = useFormik({
    initialValues: { name: '', icon: '', color: '#FFF' },
    validationSchema: boxSchema,
    onSubmit: async (values) => {
      try {
        handleClose();
        props.createBox(values.name, values.icon, values.color);
        enqueueSnackbar('Box created successfully', {
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
    },
  });

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle>Create a new box</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                autoFocus
                name="name"
                id="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                sx={{ mb: 2, mt: 1 }}
              />
              <TextField
                name="icon"
                id="icon"
                label="Icon"
                fullWidth
                sx={{ mb: 2 }}
                value={formik.values.icon}
                onChange={formik.handleChange}
                error={formik.touched.icon && Boolean(formik.errors.icon)}
                helperText={formik.touched.icon && formik.errors.icon}
              />
              <ColorPicker
                name="color"
                id="color"
                label="Color (HEX)"
                value={formik.values.color}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
                handleColorPickerChange={(color: any) => {
                  formik.setFieldValue('color', color.hex);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateBoxDialog;

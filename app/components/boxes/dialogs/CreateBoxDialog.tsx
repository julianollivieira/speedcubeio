import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  LinearProgress,
} from '@mui/material';
import ColorPicker from '@/components/misc/ColorPicker';
import { boxValidationSchema } from '@/validations';
import { useFormik } from 'formik';
import { useState } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';

interface Props {
  open: boolean;
  handleClose: () => void;
  createBox: (name: string, icon: string, color: string) => Promise<void>;
}

const CreateBoxDialog = ({ open, handleClose, createBox }: Props) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { name: '', icon: '', color: '#FFF' },
    validationSchema: boxValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await createBox(values.name, values.icon, values.color);
        createSnackbar(
          enqueueSnackbar,
          closeSnackbar,
          'Box created succesfully',
          'success'
        );
        handleClose();
        formik.resetForm();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        createSnackbar(
          enqueueSnackbar,
          closeSnackbar,
          "Something wen't wrong, please try again",
          'error'
        );
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle>Create a new box</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="name"
            id="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            sx={{ my: 2 }}
          />
          <TextField
            name="icon"
            id="icon"
            label="Icon"
            value={formik.values.icon}
            onChange={formik.handleChange}
            error={formik.touched.icon && !!formik.errors.icon}
            helperText={formik.touched.icon && formik.errors.icon}
            fullWidth
            sx={{ mb: 2 }}
          />
          <ColorPicker
            name="color"
            id="color"
            label="Color (HEX)"
            value={formik.values.color}
            onChange={formik.handleChange}
            error={formik.touched.color && !!formik.errors.color}
            helperText={formik.touched.color && formik.errors.color}
            handlePickerColorChange={(color) => {
              formik.setFieldValue('color', color.hex);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            Create
          </Button>
        </DialogActions>
      </Box>
      {loading ? (
        <LinearProgress
          sx={{
            width: 1,
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          }}
        />
      ) : (
        <></>
      )}
    </Dialog>
  );
};

export default CreateBoxDialog;

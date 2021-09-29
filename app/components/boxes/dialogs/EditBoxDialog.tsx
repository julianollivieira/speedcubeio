import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box as MUIBox,
  LinearProgress,
} from '@mui/material';
import ColorPicker from '@/components/misc/ColorPicker';
import { boxValidationSchema } from '@/validations';
import { useFormik } from 'formik';
import { Box } from '@/types';
import { ReactElement, useState } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';

interface Props {
  box: Box;
  handleClose: () => void;
  editBox: (name: string, icon: string, color: string) => Promise<void>;
}

const EditBoxDialog = ({ box, handleClose, editBox }: Props): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: box.name,
      icon: box.icon,
      color: box.color,
    },
    validationSchema: boxValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await editBox(values.name, values.icon, values.color);
        createSnackbar(
          enqueueSnackbar,
          closeSnackbar,
          'Box saved succesfully',
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
    <Dialog open={!!box} onClose={handleClose}>
      <MUIBox component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle>Edit a box</DialogTitle>
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
            Save
          </Button>
        </DialogActions>
      </MUIBox>
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

export default EditBoxDialog;

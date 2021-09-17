import { ReactElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box as MUIBox,
  Grid,
} from '@mui/material';
import ColorPicker from '@/components/general/ColorPicker';
import boxSchema from '@/validation/box';
import { useFormik } from 'formik';
import Box from '@/types/Box';

interface Props {
  box: Box | null;
  handleClose: () => void;
  editBox: any;
}

const EditBoxDialog = (props: Props): ReactElement | null => {
  const handleClose = () => {
    formik.resetForm();
    props.handleClose();
  };

  if (!props.box) {
    return null;
  }

  const formik = useFormik({
    initialValues: {
      name: props.box?.name,
      icon: props.box?.icon,
      color: props.box?.color,
    },
    validationSchema: boxSchema,
    onSubmit: async (values) => {
      try {
        handleClose();
        props.editBox(props.box?.id, values.name, values.icon, values.color);
      } catch (error) {
        console.log('error', error);
      }
    },
  });

  return (
    <Dialog open={Boolean(props.box?.id)} onClose={handleClose}>
      <MUIBox component="form" onSubmit={formik.handleSubmit}>
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
      </MUIBox>
    </Dialog>
  );
};

export default EditBoxDialog;

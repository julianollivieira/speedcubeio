import { ReactElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
} from '@material-ui/core';
import ColorPicker from '@/components/general/ColorPicker';
import boxSchema from '@/validation/box';
import { useFormik } from 'formik';
import BoxCard from '@/components/boxes/BoxCard';

interface Props {
  open: boolean;
  handleClose: () => void;
  createBox: any;
}

const CreateBoxDialog = (props: Props): ReactElement => {
  const formik = useFormik({
    initialValues: { name: '', icon: '', color: '#FFF' },
    validationSchema: boxSchema,
    onSubmit: async (values) => {
      try {
        props.handleClose();
        props.createBox(values.name, values.icon, values.color);
      } catch (error) {
        console.log('error', error);
      }
    },
  });

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle>Create a new box</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid container>
            <Grid
              item
              xs={12}
              lg={6}
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
                  console.log(color);
                  formik.setFieldValue('color', color.hex);
                }}
              />
            </Grid>
            <Grid
              xs={12}
              lg={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                pt: { xs: 2, lg: 0 },
                pl: { xs: 0, lg: 3 },
                mt: 1,
              }}
            >
              {/* <Typography variant="subtitle1">Preview</Typography> */}
              {/* <BoxCard
                id="testid"
                box={{
                  name: formik.values.name,
                  color: formik.values.color,
                  icon: formik.values.icon,
                }}
                noActions
              /> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateBoxDialog;

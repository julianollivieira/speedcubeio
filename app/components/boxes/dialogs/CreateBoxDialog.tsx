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
import { useState, ReactElement } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import createBox from '@/services/boxes/createBox';
import { useAtom } from 'jotai';
import { userAtom, boxesAtom } from '@/store';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const CreateBoxDialog = ({ open, handleClose }: Props): ReactElement => {
  const [user] = useAtom(userAtom);
  const [boxes, setBoxes] = useAtom(boxesAtom);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { name: '', icon: '', color: '#FFF' },
    validationSchema: boxValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      createBox(user!, values)
        .then((box) => {
          setBoxes([...boxes, box]);
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            'Box created succesfully',
            'success'
          );
          handleClose();
          formik.resetForm();
          setLoading(false);
        })
        .catch(() => {
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            "Something wen't wrong, please try again",
            'error'
          );
          setLoading(false);
        });
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle sx={{ bgcolor: 'background.paper' }}>Create a new box</DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#151C24' }}>
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
        <DialogActions sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Create
          </Button>
        </DialogActions>
      </Box>
      {loading ?? (
        <LinearProgress
          sx={{
            width: 1,
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          }}
        />
      )}
    </Dialog>
  );
};

export default CreateBoxDialog;

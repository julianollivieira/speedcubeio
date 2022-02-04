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
import { boxValidationSchema } from '@/validations';
import { useFormik } from 'formik';
import { Time } from '@/types';
import { ReactElement, useState } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';

interface Props {
  time: Time;
  handleClose: () => void;
  editTime: (
    timeId: string,
    timeData: Pick<Time, 'time' | 'puzzle' | 'scramble' | 'comment'>
  ) => Promise<void>;
}

const EditTimeDialog = ({ time, handleClose, editTime }: Props): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      time: time.time,
      puzzle: time.puzzle,
      scramble: time.scramble,
      comment: time.comment,
    },
    validationSchema: boxValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await editTime(time.id, {
          time: values.time,
          puzzle: values.puzzle,
          scramble: values.scramble,
          comment: values.comment,
        });
        createSnackbar(
          enqueueSnackbar,
          closeSnackbar,
          'Time saved succesfully',
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
    <Dialog open={!!time} onClose={handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle sx={{ bgcolor: 'background.paper' }}>Edit a time</DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#151C24' }}>
          <TextField
            autoFocus
            name="scramble"
            id="scramble"
            label="Scramble"
            value={formik.values.scramble}
            onChange={formik.handleChange}
            error={formik.touched.scramble && !!formik.errors.scramble}
            helperText={formik.touched.scramble && formik.errors.scramble}
            fullWidth
            sx={{ my: 2 }}
          />
          <TextField
            name="comment"
            id="comment"
            label="Comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            error={formik.touched.comment && !!formik.errors.comment}
            helperText={formik.touched.comment && formik.errors.comment}
            fullWidth
            sx={{ my: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            Save
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

export default EditTimeDialog;

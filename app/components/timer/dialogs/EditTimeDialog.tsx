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
import { timeValidationSchema } from '@/validations';
import { useFormik } from 'formik';
import { Time } from '@/types';
import { ReactElement, useState } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import { IMaskMixin } from 'react-imask';
import editTime from '@/services/times/editTime';
import { useAtom } from 'jotai';
import { userAtom, boxesAtom, currentBoxIdAtom } from '@/store';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import PuzzleSelector from '@/components/misc/PuzzleSelector';
dayjs.extend(duration);

const MaskedInput = IMaskMixin(({ inputRef }) => (
  <TextField inputRef={inputRef} label="Time" fullWidth sx={{ my: 2 }} />
));

interface Props {
  time: Time;
  handleClose: () => void;
}

const EditTimeDialog = ({ time, handleClose }: Props): ReactElement => {
  const [user] = useAtom(userAtom);
  const [boxes, setBoxes] = useAtom(boxesAtom);
  const [currentBoxId] = useAtom(currentBoxIdAtom);

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      time: time.time,
      puzzle: time.puzzle,
      scramble: time.scramble,
      comment: time.comment,
    },
    validationSchema: timeValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      editTime(user!, currentBoxId!, time.id, values)
        .then((time) => {
          if (!time) return;
          const currentBox = boxes.find((b) => b.id === currentBoxId);
          if (!currentBox) return; // throw?
          currentBox.times = currentBox.times.map((t) => (t.id === time.id ? time : t));
          const newBoxes = boxes.map((b) => (b.id === currentBoxId ? currentBox : b));
          setBoxes(newBoxes);
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            'Box created succesfully',
            'success'
          );
          handleClose();
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
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

  const timeValue = dayjs
    .duration(formik.values.time)
    .format('HH:mm:ss.SSS')
    .slice(0, -1);

  return (
    <Dialog open={!!time} onClose={handleClose}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogTitle sx={{ bgcolor: 'background.paper' }}>Edit a time</DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#151C24' }}>
          <MaskedInput
            autoFocus
            name="time"
            id="time"
            mask="00:#0:#0.00"
            value={timeValue}
            definitions={{
              '#': /[0-5]/,
            }}
            onAccept={(t) => {
              const b = t + '0';
              if (b.length === 12) {
                const HHmmss = b.split(':');
                const hours = parseInt(HHmmss[0], 10);
                const minutes = parseInt(HHmmss[1], 10);
                const ssSSS = HHmmss[2].split('.');
                const seconds = parseInt(ssSSS[0], 10);
                const milliseconds = parseInt(ssSSS[1], 10);
                const a = dayjs.duration({ hours, minutes, seconds, milliseconds });
                formik.setFieldValue('time', a.asMilliseconds());
              }
            }}
          />
          <TextField
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
          <PuzzleSelector
            currentPuzzle={formik.values.puzzle}
            onChange={(puzzle) => {
              formik.setFieldValue('puzzle', puzzle);
            }}
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
          <Button variant="contained" type="submit" disabled={loading}>
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

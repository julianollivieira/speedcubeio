import { Box, Typography, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { changePasswordValidationSchema } from '@/validations';
import { useState, ReactElement } from 'react';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import changePassword from '@/services/auth/changePassword';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';

const SecuritySettings = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [user] = useAtom(userAtom);

  const formik = useFormik({
    initialValues: { currentPassword: '', newPassword: '' },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values) => {
      if (!user) return;
      changePassword(user, values)
        .then(() => {
          setLoading(false);
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            'Succesfully changed password',
            'success'
          );
        })
        .catch(() => {
          setLoading(false);
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            "Something wen't wrong, please try again",
            'error'
          );
        });
    },
  });

  return (
    <Box
      sx={{
        pt: 3,
        px: { xs: 0, lg: 5 },
        pb: { xs: 0, lg: 3 },
        minWidth: { md: '600px' },
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Security
      </Typography>
      <Box
        sx={{ pt: 4, display: 'flex', flexDirection: 'column' }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h6">Change your password</Typography>
        <TextField
          name="currentPassword"
          label="Current password"
          variant="outlined"
          type="password"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          error={formik.touched.currentPassword && !!formik.errors.currentPassword}
          helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          sx={{ mt: 1 }}
        />
        <TextField
          name="newPassword"
          label="New password"
          variant="outlined"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.touched.newPassword && !!formik.errors.newPassword}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          sx={{ mt: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: 'fit-content', px: 3, mt: 1 }}
          disabled={loading}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default SecuritySettings;

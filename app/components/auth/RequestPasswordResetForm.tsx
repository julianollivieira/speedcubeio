import { Paper, Typography, Box, TextField, Button, LinearProgress } from '@mui/material';
import Link from '@/components/misc/Link';
import { useFormik } from 'formik';
import { requestPasswordResetValidationSchema } from '@/validations';
import { useState, ReactElement } from 'react';
import Logo from '@/components/misc/Logo';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import authErrors from '@/utils/authErrors';
import Router from 'next/router';
import requestPasswordReset from '@/services/auth/requestPasswordReset';

interface Error {
  code: string;
}

const RequestPasswordResetForm = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: requestPasswordResetValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      requestPasswordReset(values)
        .then(() => {
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            'Password reset link sent',
            'info'
          );
          Router.push('/login');
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            authErrors[(error as Error).code],
            'error'
          );
        });
    },
  });

  return (
    <Paper elevation={3} sx={{ width: 1 }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ p: 3, width: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            mb: { xs: 3, sm: 0 },
          }}
        >
          <Link href="/" passHref sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <Logo sx={{ height: '75px' }} />
          </Link>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '1.2em',
              ml: { xs: 1, sm: 0 },
              mt: { xs: 0, sm: 2 },
              mb: { xs: 0, sm: 5 },
            }}
          >
            Request password reset link
          </Typography>
        </Box>
        <TextField
          name="email"
          label="Email address"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 3 }}
        />
        <Box sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/login" passHref sx={{ textDecoration: 'none' }}>
            <Button color="primary">Return to login</Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ px: 3 }}
          >
            Request
          </Button>
        </Box>
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
    </Paper>
  );
};

export default RequestPasswordResetForm;

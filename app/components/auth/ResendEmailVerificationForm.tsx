import { Paper, Typography, Box, TextField, Button, LinearProgress } from '@mui/material';
import Link from '@/components/misc/Link';
import { useFormik } from 'formik';
import { loginValidationSchema } from '@/validations';
import { useState, ReactElement } from 'react';
import Logo from '@/components/misc/Logo';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import authErrors from '@/utils/authErrors';
import { useData } from '@/hooks/useData';
import Router from 'next/router';

interface Error {
  code: string;
}

const ResendEmailVerificationForm = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { resendEmailVerification } = useData();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await resendEmailVerification(values.email, values.password);
        createSnackbar(enqueueSnackbar, closeSnackbar, 'Verification email sent', 'info');
        setLoading(false);
        Router.push('/login');
      } catch (error: unknown) {
        setLoading(false);
        createSnackbar(
          enqueueSnackbar,
          closeSnackbar,
          authErrors[(error as Error).code],
          (error as Error).code === 'auth/email-already-verified' ? 'success' : 'error'
        );
      }
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
            <Logo sx={{ height: 75 }} />
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
            Resend email verification
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
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
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
            Resend
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

export default ResendEmailVerificationForm;

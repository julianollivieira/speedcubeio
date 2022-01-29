import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  LinearProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Link from '@/components/misc/Link';
import { useFormik } from 'formik';
import { signupValidationSchema } from '@/validations';
import { useState, ReactElement } from 'react';
import Router from 'next/router';
import Logo from '@/components/misc/Logo';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import authErrors from '@/utils/authErrors';
import signup from '@/services/auth/signup';

interface Error {
  code: string;
}

const SignupForm = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: 'false',
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      signup(values)
        .then(() => {
          createSnackbar(
            enqueueSnackbar,
            closeSnackbar,
            'Succesfully logged in',
            'success'
          );
          Router.push('/login');
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
              ml: { xs: 2, sm: 0 },
              mt: { xs: 0, sm: 2 },
              mb: { xs: 0, sm: 5 },
            }}
          >
            Sign up for Speedcube.io
          </Typography>
        </Box>
        <TextField
          name="displayName"
          label="Display name"
          variant="outlined"
          value={formik.values.displayName}
          onChange={formik.handleChange}
          error={formik.touched.displayName && !!formik.errors.displayName}
          helperText={formik.touched.displayName && formik.errors.displayName}
          sx={{ mb: 2 }}
        />
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
          sx={{ mb: 2 }}
        />
        <TextField
          name="confirmPassword"
          type="password"
          label="Confirm password"
          variant="outlined"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          name="acceptTerms"
          sx={{ mt: 1 }}
          value={formik.values.acceptTerms}
          onChange={formik.handleChange}
          control={<Checkbox />}
          label={
            <Typography>
              I accept the{' '}
              <Link href="/terms-and-conditions" passHref>
                terms and conditions
              </Link>
              .
            </Typography>
          }
        />
        {formik.touched.acceptTerms && !!formik.errors.acceptTerms ? (
          <Typography variant="caption" color="error" sx={{ pl: 2 }}>
            {formik.touched.acceptTerms && formik.errors.acceptTerms}
          </Typography>
        ) : (
          <></>
        )}
        <Box sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/login" passHref sx={{ textDecoration: 'none' }}>
            <Button color="primary">Log in instead</Button>
          </Link>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            Sign up
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

export default SignupForm;

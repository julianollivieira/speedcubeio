import { ReactElement, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  LinearProgress,
} from '@mui/material';
import Link from '@/components/general/Link';
import loginSchema from '@/validation/login';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useAuth } from '@/utils/auth';

const LoginForm = (): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setError(null);
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await login(values.email, values.password);
        router.push('/home');
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    },
  });
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ my: 5 }}>Log in to Speedcube.io</Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: 1, display: 'flex', flexDirection: 'column', px: 3 }}
        >
          <TextField
            name="email"
            label="Email address"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 1 }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mt: 1 }}
          />
          <Box sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} href="/signup" color="primary">
              Create account
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              Log In
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
          ''
        )}
      </Paper>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={10000}
        onClose={handleAlertClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleAlertClose}
          severity="error"
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;

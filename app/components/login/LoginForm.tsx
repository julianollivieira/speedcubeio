import { ReactElement } from 'react';
import { Paper, Typography, Box, TextField, Button } from '@material-ui/core';
import Link from '@/components/general/Link';
import loginSchema from '@/validation/login';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useAuth } from '@/utils/auth';

const LoginForm = (): ReactElement => {
  const router = useRouter();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        router.push('/home');
      } catch (error) {
        console.log('error', error);
      }
    },
  });
  return (
    <Paper
      elevation={3}
      sx={{
        width: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 3,
      }}
    >
      <Typography sx={{ my: 5 }}>Log in to Speedcube.io</Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: 1, display: 'flex', flexDirection: 'column' }}
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
            Sign up for free
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Log In
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginForm;

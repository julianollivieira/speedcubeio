import { Paper, Typography, Box, TextField, Button, LinearProgress } from '@mui/material';
import Link from '@/components/misc/Link';
import { useFormik } from 'formik';
import { loginValidationSchema } from '@/validations';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Router from 'next/router';
import Logo from '@/components/misc/Logo';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await login(values.email, values.password);
        Router.push('/home');
      } catch (error: any) {
        setError(error.code);
        setLoading(false);
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
            Log in to Speedcube.io
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
          <Link href="/signup" passHref sx={{ textDecoration: 'none' }}>
            <Button color="primary">Create account</Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ px: 3 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
      {loading ?
        <LinearProgress
          sx={{
            width: 1,
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
          }}
        />
        :
        <></>
      }
    </Paper>
  );
};

export default LoginForm;

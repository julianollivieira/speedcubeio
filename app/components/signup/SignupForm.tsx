import { ReactElement, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link as MUILink,
  LinearProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Link from '@/components/general/Link';
import signupSchema from '@/validation/signup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useAuth } from '@/utils/auth';
import { useSnackbar } from 'notistack';
import convertAuthCodeToMessage from '@/utils/convertAuthCodeToMessage';

const SignupForm = (): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const { signup } = useAuth();

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: 'false',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await signup(values.displayName, values.email, values.password);
        enqueueSnackbar('Signup succesful', {
          variant: 'success',
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          ),
        });
        router.push('/home');
      } catch (error: any) {
        setError(error.code);
        setLoading(false);
        enqueueSnackbar(convertAuthCodeToMessage(error.code), {
          variant: 'error',
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          ),
        });
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
        <Typography sx={{ my: 5 }}>Sign up for Speedcube.io</Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: 1, display: 'flex', flexDirection: 'column', px: 3 }}
        >
          <TextField
            name="displayName"
            label="Display name"
            variant="outlined"
            value={formik.values.displayName}
            onChange={formik.handleChange}
            error={
              formik.touched.displayName && Boolean(formik.errors.displayName)
            }
            helperText={formik.touched.displayName && formik.errors.displayName}
            sx={{ mb: 1 }}
          />
          <TextField
            name="email"
            label="Email address"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ my: 1 }}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ my: 1 }}
          />
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm password"
            variant="outlined"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={{ mt: 1 }}
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
                <MUILink
                  component={Link}
                  href="/terms-and-conditions"
                  underline="hover"
                >
                  terms and conditions
                </MUILink>
                .
              </Typography>
            }
          />
          {formik.touched.acceptTerms && Boolean(formik.errors.acceptTerms) ? (
            <Typography variant="caption" color="error" sx={{ pl: 2 }}>
              {formik.touched.acceptTerms && formik.errors.acceptTerms}
            </Typography>
          ) : (
            ''
          )}
          <Box sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} href="/login" color="primary">
              Log in instead
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
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
          ''
        )}
      </Paper>
    </>
  );
};

export default SignupForm;

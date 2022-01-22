import type { NextPage } from 'next';
import { Button } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';
import Link from '@/components/misc/Link';
import RequireAuthenticated from '@/components/misc/RequireAuthenticated';
import AlternateLayout from '@/components/layout/AlternateLayout';

const LoginPage: NextPage = () => {
  return (
    <RequireAuthenticated inverse>
      <AlternateLayout title="Log in">
        <LoginForm />
        <Link href="/forgot-password" passHref sx={{ mt: 3, textDecoration: 'none' }}>
          <Button color="primary">Forgot your password?</Button>
        </Link>
        <Link href="/resend-email-verification" passHref sx={{ textDecoration: 'none' }}>
          <Button color="primary">Resend email verification</Button>
        </Link>
      </AlternateLayout>
    </RequireAuthenticated>
  );
};

export default LoginPage;

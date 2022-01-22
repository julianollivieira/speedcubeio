import type { NextPage } from 'next';
import { Button } from '@mui/material';
import RequestPasswordResetForm from '@/components/auth/RequestPasswordResetForm';
import Link from '@/components/misc/Link';
import RequireUnauthenticated from '@/components/misc/RequireUnauthenticated';
import AlternateLayout from '@/components/layout/AlternateLayout';

const ForgotPasswordPage: NextPage = () => {
  return (
    <RequireUnauthenticated>
      <AlternateLayout title="Request password reset">
        <RequestPasswordResetForm />
        <Link href="/signup" passHref sx={{ mt: 3, textDecoration: 'none' }}>
          <Button color="primary">Create an account instead</Button>
        </Link>
      </AlternateLayout>
    </RequireUnauthenticated>
  );
};

export default ForgotPasswordPage;

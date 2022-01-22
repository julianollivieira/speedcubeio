import type { NextPage } from 'next';
import { Button } from '@mui/material';
import ResendEmailVerificationForm from '@/components/auth/ResendEmailVerificationForm';
import Link from '@/components/misc/Link';
import RequireUnauthenticated from '@/components/misc/RequireUnauthenticated';
import AlternateLayout from '@/components/layout/AlternateLayout';

const ResendEmailVerificationPage: NextPage = () => {
  return (
    <RequireUnauthenticated>
      <AlternateLayout title="Resend email verification">
        <ResendEmailVerificationForm />
        <Link href="/signup" passHref sx={{ mt: 3, textDecoration: 'none' }}>
          <Button color="primary">Create an account instead</Button>
        </Link>
      </AlternateLayout>
    </RequireUnauthenticated>
  );
};

export default ResendEmailVerificationPage;

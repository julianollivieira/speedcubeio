import type { NextPage } from 'next';
import SignupForm from '@/components/auth/SignupForm';
import RequireUnauthenticated from '@/components/misc/RequireUnauthenticated';
import AlternateLayout from '@/components/layout/AlternateLayout';

const SignupPage: NextPage = () => {
  return (
    <RequireUnauthenticated>
      <AlternateLayout title="Sign up">
        <SignupForm />
      </AlternateLayout>
    </RequireUnauthenticated>
  );
};

export default SignupPage;

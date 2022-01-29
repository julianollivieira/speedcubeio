import type { NextPage } from 'next';
import SignupForm from '@/components/auth/SignupForm';
import RequireAuthenticated from '@/components/misc/RequireAuthenticated';
import AlternateLayout from '@/components/layout/AlternateLayout';

const SignupPage: NextPage = () => {
  return (
    <RequireAuthenticated inverse>
      <AlternateLayout title="Sign up">
        <SignupForm />
      </AlternateLayout>
    </RequireAuthenticated>
  );
};

export default SignupPage;

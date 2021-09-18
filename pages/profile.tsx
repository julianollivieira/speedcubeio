import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import UserLayout from '@/components/layout/UserLayout';
import Profile from '@/components/profile/Profile';
import useUser from '@/hooks/useUser';

const ProfilePage: NextPage = (): ReactElement => {
  const { currentUser, currentUserData } = useAuth();

  const { fullUser } = useUser({
    user: currentUser,
    data: currentUserData,
  });

  return (
    <UserLayout
      title="Your profile"
      sx={{
        mt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
        height: 'calc(100vh - 64px)',
        overflowY: 'scroll',
      }}
    >
      <Profile user={fullUser} />
    </UserLayout>
  );
};

export default ProfilePage;

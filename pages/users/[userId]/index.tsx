import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from 'firebase/auth';
import { Profile as ProfileType } from '@/types';
import { Backdrop, CircularProgress } from '@mui/material';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data } = useSWR<{
    user: User;
    profile: ProfileType;
  }>(userId ? `/api/users/${userId}/profile` : null, fetcher);

  const { user, profile } = data || {
    user: null,
    profile: null,
  };

  return (
    <Layout title={`${user?.displayName ?? 'Someone'}'s profile`} allowUnauthorized>
      {data ? (
        <Profile profile={profile} user={user} />
      ) : (
        <Backdrop open sx={{ color: '#fff', zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}
    </Layout>
  );
};

export default ProfilePage;

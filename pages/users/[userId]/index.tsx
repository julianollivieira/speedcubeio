import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from 'firebase/auth';
import { Profile as ProfileType } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data } = useSWR<{ user: User; profile: ProfileType }>(
    userId ? `/api/users/${userId}/profile` : null,
    fetcher
  );

  const { user, profile } = data || { user: undefined, profile: undefined };

  return (
    <Layout title={`${user?.displayName ?? 'Someone'}'s profile`} allowUnauthorized>
      <Profile profile={profile} hideIfPrivate user={user} />
    </Layout>
  );
};

export default ProfilePage;

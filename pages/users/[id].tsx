import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import UserLayout from '@/components/layout/UserLayout';
import Profile from '@/components/profile/Profile';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useUser from '@/hooks/useUser';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfilePage: NextPage = (): ReactElement => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR<{ user: any; data: any }>(
    id ? `/api/users/${id}` : null,
    fetcher
  );

  const { currentUser } = useAuth();
  const { fullUser } = useUser(data);

  return (
    <>
      {currentUser ? (
        <UserLayout
          title={`${fullUser?.displayName ?? 'Someone'}'s profile`}
          sx={{
            pt: '64px',
            pl: { xs: 0, md: '240px' },
            pr: { xs: 0, md: '240px' },
          }}
        >
          <Profile user={fullUser} />
        </UserLayout>
      ) : (
        <Layout
          title={`${fullUser?.displayName ?? 'Someone'}'s profile`}
          sx={{ pt: 5 }}
        >
          <Profile user={fullUser} />
        </Layout>
      )}
    </>
  );
};

export default ProfilePage;

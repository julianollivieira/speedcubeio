import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import UserLayout from '@/components/layout/UserLayout';
import Layout from '@/components/layout/Layout';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Profile: NextPage = (): ReactElement => {
  const { currentUser } = useAuth();
  const { data, error } = useSWR('/api/admin/getUser', fetcher);
  return currentUser ? (
    <UserLayout>
      <p>Profile</p>
    </UserLayout>
  ) : (
    <Layout>
      <p>Profile</p>
    </Layout>
  );
};

export default Profile;

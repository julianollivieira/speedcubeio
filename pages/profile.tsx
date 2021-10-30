import Layout from '@/components/layout/Layout';
import type { NextPage } from 'next';
import Profile from '@/components/profile/Profile';
import { useData } from '@/hooks/useData';

const ProfilePage: NextPage = () => {
  const { user, profile } = useData();

  return (
    <Layout title="Your profile" isApp>
      <Profile profile={profile} showControls user={user} />
    </Layout>
  );
};

export default ProfilePage;

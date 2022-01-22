import Layout from '@/components/layout/Layout';
import type { NextPage } from 'next';
import Profile from '@/components/profile/Profile';
import { userAtom, profileAtom } from '@/store';
import { useAtom } from 'jotai';

const ProfilePage: NextPage = () => {
  const [user] = useAtom(userAtom);
  const [profile] = useAtom(profileAtom);

  return (
    <Layout title="Your profile">
      <Profile profile={profile} showControls user={user} />
    </Layout>
  );
};

export default ProfilePage;

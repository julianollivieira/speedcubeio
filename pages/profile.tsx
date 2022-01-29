import Layout from '@/components/layout/Layout';
import type { NextPage } from 'next';
import Profile from '@/components/profile/Profile';
import { userAtom, profileAtom } from '@/store';
import { useAtom } from 'jotai';
import RequireAuthenticated from '@/components/misc/RequireAuthenticated';

const ProfilePage: NextPage = () => {
  const [user] = useAtom(userAtom);
  const [profile] = useAtom(profileAtom);

  return (
    <Layout title="Your profile">
      <RequireAuthenticated>
        <Profile profile={profile!} showControls user={user!} />
      </RequireAuthenticated>
    </Layout>
  );
};

export default ProfilePage;

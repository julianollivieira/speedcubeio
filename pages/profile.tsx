import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store';

const ProfilePage: NextPage = () => {
  const user = useSelector(selectUser);

  return (
    <Layout title="Your profile" isApp>
      <Container sx={{ pt: '64px' }}>
        {/* <Profile user={user} showControls /> */}
        <h1>{user?.displayName}</h1>
      </Container>
    </Layout>
  );
};

export default ProfilePage;

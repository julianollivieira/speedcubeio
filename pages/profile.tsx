import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import { useAuth } from '@/hooks/useAuth';
import { Container } from '@mui/material';

const ProfilePage: NextPage = () => {
  const { user } = useAuth();

  return (
    <Layout title="Your profile" isApp>
      <Container sx={{ pt: '64px' }}>
        <Profile user={user} />
      </Container>
    </Layout>
  );
};

export default ProfilePage;

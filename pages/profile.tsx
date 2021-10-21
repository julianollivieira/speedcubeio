import { Container, Box } from '@mui/material';
import Layout from '@/components/layout/Layout';
import type { NextPage } from 'next';
import Profile from '@/components/profile/Profile';
import { useData } from '@/hooks/useData';

const ProfilePage: NextPage = () => {
  const { user, profile } = useData();

  return (
    <Layout title="Your profile" isApp>
      <Container sx={{ pt: '64px' }}>
        <Box sx={{ mx: { xs: 0, md: '73px' } }}>
          <Profile profile={profile} showControls user={user} />
        </Box>
      </Container>
    </Layout>
  );
};

export default ProfilePage;

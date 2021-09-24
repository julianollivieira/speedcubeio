import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useUser from '@/hooks/userUser';
import { Container, Box, CircularProgress } from '@mui/material';
import { User as FirebaseUser } from 'firebase/auth';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data } = useSWR<{ user: unknown }>(userId ? `/api/users/${userId}` : null, fetcher);
  const user = useUser(data?.user as FirebaseUser);

  return (
    <Layout title="Your profile" isApp allowUnauthenticated>
      {user ? (
        <Container sx={{ pt: '64px' }}>
          <Profile user={user} />
        </Container>
      ) : (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Layout>
  );
};

export default ProfilePage;

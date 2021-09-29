import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useUser from '@/hooks/userUser';
import { Box, Divider, CircularProgress } from '@mui/material';
import { AllInbox as AllInboxIcon } from '@mui/icons-material';
import PageHeader from '@/components/misc/PageHeader';
import BoxGrid from '@/components/boxes/grid/BoxGrid';
import { User as FirebaseUser } from 'firebase/auth';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, error } = useSWR<{ user: unknown }>(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );
  const user = useUser(data?.user as FirebaseUser);

  return (
    <Layout
      title={user ? `${user.displayName}'s boxes'` : 'User not found'}
      isApp
      allowUnauthenticated
    >
      {user || error ? (
        <Box
          sx={{
            pt: '64px',
            px: { md: '240px' },
          }}
        >
          <Box sx={{ px: 2 }}>
            <PageHeader
              title={user ? `${user?.displayName}'s boxes` : 'User not found'}
              icon={AllInboxIcon}
            />
            <Divider sx={{ mb: 3 }} />
            <BoxGrid user={user} showControls={false} />
          </Box>
        </Box>
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

export default BoxPage;

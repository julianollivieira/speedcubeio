import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useUser from '@/hooks/userUser';
import { Box, Divider, CircularProgress } from '@mui/material';
import { AllInbox as AllInboxIcon } from '@mui/icons-material';
import PageHeader from '@/components/misc/PageHeader';
import BoxGrid from '@/components/boxes/grid/BoxGrid';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data } = useSWR<{ user: any }>(userId ? `/api/users/${userId}` : null, fetcher);
  const user = useUser(data?.user);

  return (
    <Layout title="Box" isApp allowUnauthenticated>
      {user ? (
        <Box
          sx={{
            pt: '64px',
            px: { md: '240px' },
          }}
        >
          <Box sx={{ px: 2 }}>
            <PageHeader title={`${user?.displayName}'s boxes`} icon={AllInboxIcon} />
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

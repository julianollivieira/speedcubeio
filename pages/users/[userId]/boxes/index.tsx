import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Box, Divider } from '@mui/material';
import { AllInbox as AllInboxIcon } from '@mui/icons-material';
import PageHeader from '@/components/misc/PageHeader';
import BoxGrid from '@/components/boxes/grid/BoxGrid';
import { User } from 'firebase/auth';
import { Box as BoxType } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data, error } = useSWR<{ user: User; boxes: BoxType[] }>(
    userId ? `/api/users/${userId}/boxes` : null,
    fetcher
  );

  const { user, boxes } = data || { user: undefined, boxes: [] };

  return (
    <Layout title="Boxes">
      <Box
        sx={{
          pt: '64px',
          px: { md: '240px' },
        }}
      >
        <Box sx={{ px: 2 }}>
          <PageHeader title={`${user?.displayName}'s boxes`} icon={AllInboxIcon} />
          <Divider sx={{ mb: 3 }} />
          <BoxGrid user={user} boxes={boxes} />
        </Box>
      </Box>
    </Layout>
  );
};

export default BoxPage;

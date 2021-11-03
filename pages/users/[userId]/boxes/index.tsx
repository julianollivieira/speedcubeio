import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Divider, Backdrop, CircularProgress } from '@mui/material';
import BoxGridHeader from '@/components/boxes/grid/BoxGridHeader';
import BoxGrid from '@/components/boxes/grid/BoxGrid';
import { User } from 'firebase/auth';
import { Box as BoxType, Profile } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data } = useSWR<{ user: User; boxes: BoxType[]; profile: Profile }>(
    userId ? `/api/users/${userId}/boxes` : null,
    fetcher
  );

  const { user, boxes, profile } = data || {
    user: null,
    boxes: [],
    profile: null,
  };

  return (
    <Layout title="Boxes" allowUnauthorized>
      {data ? (
        <>
          <BoxGridHeader
            title={user ? `${user?.displayName}'s boxes` : 'User not found'}
            user={user}
            showControls
          />
          <Divider sx={{ mb: 3 }} />
          <BoxGrid user={user} boxes={boxes} profile={profile} />
        </>
      ) : (
        <Backdrop open sx={{ color: '#fff', zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}
    </Layout>
  );
};

export default BoxPage;

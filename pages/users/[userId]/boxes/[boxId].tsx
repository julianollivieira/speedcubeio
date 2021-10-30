import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import Box from '@/components/boxes/Box';
import useSWR from 'swr';
import { Box as MUIBox } from '@mui/material';
import { User } from 'firebase/auth';
import { Box as BoxType, Profile } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { userId, boxId } = router.query;

  const { data } = useSWR<{ user: User; box: BoxType; profile: Profile }>(
    userId ? `/api/users/${userId}/boxes/${boxId}` : null,
    fetcher
  );

  const { user, box, profile } = data || {
    user: undefined,
    box: undefined,
    profile: undefined,
  };

  return (
    <Layout title="Box" allowUnauthorized>
      <MUIBox sx={{ mr: { lg: `${360 - 73}px` } }}>
        <Box user={user} box={box} profile={profile} />
      </MUIBox>
    </Layout>
  );
};

export default BoxPage;

import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import Box from '@/components/boxes/Box';
import useSWR from 'swr';
import useUser from '@/hooks/userUser';
import { Box as MUIBox, CircularProgress } from '@mui/material';
import { User as FirebaseUser } from 'firebase/auth';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { userId, boxId } = router.query;
  const { data, error } = useSWR<{ user: unknown }>(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );
  const user = useUser(data?.user as FirebaseUser);
  const box = user?.boxes.find((box) => box.id == boxId);

  return (
    <Layout
      title={box ? box.name : `${!user ? 'User' : 'Box'} not found`}
      isApp
      allowUnauthenticated
    >
      {user || error ? (
        <MUIBox
          sx={{
            pt: '64px',
            pl: { md: '240px' },
            pr: { md: '240px', lg: `${box ? 360 + (240 - 73) : 240}px` },
          }}
        >
          <MUIBox sx={{ px: 2 }}>
            <Box user={user} box={box} />
          </MUIBox>
        </MUIBox>
      ) : (
        <MUIBox
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </MUIBox>
      )}
    </Layout>
  );
};

export default BoxPage;

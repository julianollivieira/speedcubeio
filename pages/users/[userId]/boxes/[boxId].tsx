import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import Box from '@/components/boxes/Box';
import useSWR from 'swr';
import useUser from '@/hooks/userUser';
import { Box as MUIBox, CircularProgress } from '@mui/material';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { userId, boxId } = router.query;
  const { data } = useSWR<{ user: any }>(userId ? `/api/users/${userId}` : null, fetcher);
  const user = useUser(data?.user);
  const box = user?.boxes.find((box) => box.id == boxId);

  return (
    <Layout title="Box" isApp allowUnauthenticated>
      {user ? (
        <MUIBox
          sx={{
            pt: '64px',
            pl: { md: '240px' },
            pr: { md: '240px', lg: `${360 + (240 - 73)}px` },
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

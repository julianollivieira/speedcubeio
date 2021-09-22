import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import Box from '@/components/boxes/Box';
import { Box as MUIBox } from '@mui/material';

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();
  const box = user?.boxes.find((box) => box.id == id);

  return (
    <Layout title="Box" isApp>
      <MUIBox
        sx={{
          pt: '64px',
          pl: { md: '240px' },
          pr: { md: '240px', lg: `${360 + (240 - 73)}px` },
        }}
      >
        <MUIBox sx={{ px: 2 }}>
          <Box user={user} box={box} showControls />
        </MUIBox>
      </MUIBox>
    </Layout>
  );
};

export default BoxPage;

import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import { useData } from '@/hooks/useData';
import Box from '@/components/boxes/Box';
import { Box as MUIBox } from '@mui/material';
import { useEffect } from 'react';

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { boxes, changeBox, user, box } = useData();

  useEffect(() => {
    if (id && boxes.length > 0) {
      console.log('🔥', id, boxes);
      changeBox(id as string);
    }
  }, [id, boxes]);

  return (
    <Layout title="Box">
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

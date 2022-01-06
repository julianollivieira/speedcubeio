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

  const { boxes, changeBox, user, box, profile } = useData();

  useEffect(() => {
    if (id && boxes.length > 0) {
      changeBox(id as string);
    }
  }, [id, boxes]);

  return (
    <Layout title="Box">
      <MUIBox sx={{ mr: { lg: `${360 - 73}px` } }}>
        <Box
          user={user}
          box={box}
          profile={profile === undefined ? null : profile}
          showControls
        />
      </MUIBox>
    </Layout>
  );
};

export default BoxPage;

import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import Box from '@/components/boxes/Box';
import { Box as MUIBox } from '@mui/material';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, profileAtom, boxesAtom, currentBoxIdAtom } from '@/store';

const BoxPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user] = useAtom(userAtom);
  const [profile] = useAtom(profileAtom);
  const [boxes] = useAtom(boxesAtom);
  const [currentBoxId, setCurrentBoxId] = useAtom(currentBoxIdAtom);

  useEffect(() => {
    if (id && boxes.length > 0) {
      setCurrentBoxId(id as string);
    }
  }, [id, boxes]);

  return (
    <Layout title="Box">
      <MUIBox sx={{ mr: { lg: `${360 - 73}px` } }}>
        <Box
          user={user}
          box={boxes.find((box) => box.id === currentBoxId)}
          profile={profile === undefined ? null : profile}
          showControls
        />
      </MUIBox>
    </Layout>
  );
};

export default BoxPage;

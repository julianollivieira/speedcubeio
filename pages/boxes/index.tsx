import type { NextPage } from 'next';
import { Divider } from '@mui/material';
import Layout from '@/components/layout/Layout';
import BoxGridHeader from '@/components/boxes/grid/BoxGridHeader';
import BoxGrid from '@/components/boxes/grid/BoxGrid';
import { useAtom } from 'jotai';
import { userAtom, profileAtom, boxesAtom } from '@/store';

const BoxesPage: NextPage = () => {
  const [user] = useAtom(userAtom);
  const [profile] = useAtom(profileAtom);
  const [boxes] = useAtom(boxesAtom);

  return (
    <Layout title="Boxes">
      <BoxGridHeader title="Your boxes" user={user} />
      <Divider sx={{ mb: 3 }} />
      <BoxGrid
        user={user}
        boxes={boxes}
        profile={profile === undefined ? null : profile}
        showControls={true}
      />
    </Layout>
  );
};

export default BoxesPage;

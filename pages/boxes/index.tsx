import type { NextPage } from 'next';
import { Divider } from '@mui/material';
import { useData } from '@/hooks/useData';
import Layout from '@/components/layout/Layout';
import BoxGridHeader from '@/components/boxes/grid/BoxGridHeader';
import BoxGrid from '@/components/boxes/grid/BoxGrid';

const BoxesPage: NextPage = () => {
  const { user, boxes, profile } = useData();

  return (
    <Layout title="Boxes">
      <BoxGridHeader title="Your boxes" user={user} />
      <Divider sx={{ mb: 3 }} />
      <BoxGrid user={user} boxes={boxes} profile={profile} showControls={true} />
    </Layout>
  );
};

export default BoxesPage;

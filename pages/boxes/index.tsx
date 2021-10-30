import type { NextPage } from 'next';
import { Divider } from '@mui/material';
import { useData } from '@/hooks/useData';
import { AllInbox as AllInboxIcon } from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/misc/PageHeader';
import BoxGrid from '@/components/boxes/grid/BoxGrid';

const BoxesPage: NextPage = () => {
  const { user, boxes, profile } = useData();

  return (
    <Layout title="Boxes">
      <PageHeader title="Your boxes" icon={AllInboxIcon} />
      <Divider sx={{ mb: 3 }} />
      <BoxGrid user={user} boxes={boxes} profile={profile} showControls={true} />
    </Layout>
  );
};

export default BoxesPage;

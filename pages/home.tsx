import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
// import { Grid, Divider } from '@mui/material';
import { Divider } from '@mui/material';
import { getPartOfDay } from '@/utils/helpers';
// import NewsAndAnnouncementsCard from '@/components/home/NewsAndAnnouncementsCard';
// import PollCard from '@/components/home/PollCard';
// import StatsCard from '@/components/home/StatsCard';
import PageHeader from '@/components/misc/PageHeader';
import { Home as HomeIcon } from '@mui/icons-material';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';

const HomePage: NextPage = () => {
  const [user] = useAtom(userAtom);

  return (
    <Layout title="Home">
      <PageHeader
        title={
          <>
            Good{getPartOfDay()}{' '}
            <span style={{ fontWeight: 'bold' }}>{user?.displayName}</span>!
          </>
        }
        icon={HomeIcon}
      />
      <Divider sx={{ mb: 3 }} />
      {/* <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={7}>
          <NewsAndAnnouncementsCard />
        </Grid>
        <Grid item xs={12} lg={5}>
          <PollCard />
        </Grid>
        <Grid item xs={12}>
          <StatsCard />
        </Grid>
      </Grid> */}
    </Layout>
  );
};

export default HomePage;

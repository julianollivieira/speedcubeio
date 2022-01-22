import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { Grid } from '@mui/material';
import { getPartOfDay } from '@/utils/helpers';
import NewsAndAnnouncementsCard from '@/components/home/NewsAndAnnouncementsCard';
import PollCard from '@/components/home/PollCard';
import StatsCard from '@/components/home/StatsCard';
import { Home as HomeIcon } from '@mui/icons-material';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';
import RequireAuthenticated from '@/components/misc/RequireAuthenticated';
import DefaultPageHeader from '@/components/pageHeaders/DefaultPageHeader';

const HomePage: NextPage = () => {
  const [user] = useAtom(userAtom);

  const headerTitle = (
    <>
      Good{getPartOfDay()} <span style={{ fontWeight: 'bold' }}>{user?.displayName}</span>
      !
    </>
  );

  return (
    <RequireAuthenticated>
      <Layout title="Home">
        <DefaultPageHeader title={headerTitle} icon={HomeIcon} />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} lg={7}>
            <NewsAndAnnouncementsCard />
          </Grid>
          <Grid item xs={12} lg={5}>
            <PollCard />
          </Grid>
          <Grid item xs={12}>
            <StatsCard />
          </Grid>
        </Grid>
      </Layout>
    </RequireAuthenticated>
  );
};

export default HomePage;

import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { Typography, Grid } from '@mui/material';
import { getPartOfDay } from '@/utils/helpers';
import NewsAndAnnouncementsCard from '@/components/home/NewsAndAnnouncementsCard';
import PollCard from '@/components/home/PollCard';
import StatsCard from '@/components/home/StatsCard';
import { useData } from '@/hooks/useData';

const HomePage: NextPage = () => {
  const { user } = useData();

  return (
    <Layout title="Home">
      <Typography variant="h3" sx={{ my: 3 }}>
        Good{getPartOfDay()}{' '}
        <span style={{ fontWeight: 'bold' }}>{user?.displayName}</span>!
      </Typography>
      <Grid container spacing={2}>
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
  );
};

export default HomePage;

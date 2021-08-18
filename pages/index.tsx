import type { NextPage } from 'next';
import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import { Container, Grid, Typography, Button, Paper } from '@material-ui/core';
import { KeyboardArrowRight as KeyboardArrowRightIcon } from '@material-ui/icons';

const Home: NextPage = (): ReactElement => {
  return (
    <>
      <Layout>
        <Container
          maxWidth="lg"
          sx={{ minHeight: 700, display: 'flex', alignItems: 'center' }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                textAlign: { xs: 'center', lg: 'left' },
              }}
            >
              <Typography variant="h2" fontWeight="bold">
                The most advanced speedcubing timer, trainer and analytics
              </Typography>
              <Typography variant="h5" sx={{ my: 3 }}>
                Join thousands of people who have switched to Speedcube.io for
                free
              </Typography>
              <Button
                color="primary"
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
              >
                Sign up for free
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', lg: 'flex-end' },
              }}
            >
              <Paper
                component="img"
                src="/images/screenshots/timer.png"
                alt="Timer screenshot"
                elevation={24}
                sx={{ width: 500 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Home;

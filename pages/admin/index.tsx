import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Admin: NextPage = (): ReactElement => {
  const { data: users, error: usersError } = useSWR(
    '/api/admin/getUsers',
    fetcher
  );
  // const { data: usersWithData, error: usersDataError } = useSWR(
  //   '/api/admin/getUsersWithData',
  //   fetcher
  // );

  console.log(users);
  return (
    <UserLayout
      title="Admin"
      sx={{
        pt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} key={1}>
          <Card sx={{ p: 2 }}>
            <Typography color="text.secondary" gutterBottom>
              Total amount of users signed up
            </Typography>
            <Typography variant="h3" color="text.secondary" gutterBottom>
              {users?.length}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} key={2}>
          <Card sx={{ p: 2 }}>
            <Typography color="text.secondary" gutterBottom>
              Total amount of users with data
            </Typography>
            <Typography variant="h3" color="text.secondary" gutterBottom>
              {/* {Object.keys(usersWithData).length} */}-
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} key={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="text.secondary" gutterBottom>
              Total amount of users that logged in this week
            </Typography>
            <Typography variant="h3" color="text.secondary" gutterBottom>
              -
            </Typography>
          </Card>
        </Grid>
        {/* {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <Card sx={{ p: 2 }}>
              <Typography color="text.secondary" gutterBottom>
                Total amount of users
              </Typography>
              <Typography variant="h3" color="text.secondary" gutterBottom>
                1.200
              </Typography>
            </Card>
          </Grid>
        ))} */}
      </Grid>
    </UserLayout>
  );
};

export default Admin;

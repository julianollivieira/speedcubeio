import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';

const Admin: NextPage = (): ReactElement => {
  const { currentUser } = useAuth();

  return (
    <UserLayout title="Admin">
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography color="text.secondary" gutterBottom>
                Total amount of users
              </Typography>
              <Typography variant="h3" color="text.secondary" gutterBottom>
                1.200
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </UserLayout>
  );
};

export default Admin;

import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Typography, Divider, Card } from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import UsersTable from '@/components/admin/UsersTable';

const Users: NextPage = (): ReactElement => {
  return (
    <UserLayout
      title="Manage users"
      sx={{
        pt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
      }}
    >
      <Typography variant="h3">Manage users</Typography>
      <Divider sx={{ my: 3 }} />
      <Card>
        <UsersTable />
      </Card>
    </UserLayout>
  );
};

export default Users;

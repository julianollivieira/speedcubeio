import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Typography, Divider, Card } from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import UsersTable from '@/components/admin/UsersTable';

const Users: NextPage = (): ReactElement => {
  return (
    <UserLayout title="Manage users">
      <Typography variant="h3">Manage users</Typography>
      <Divider sx={{ my: 3 }} />
      <Card>
        <UsersTable />
      </Card>
    </UserLayout>
  );
};

export default Users;

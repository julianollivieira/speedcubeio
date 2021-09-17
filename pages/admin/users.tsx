import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Card, Divider } from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';
import PageHeader from '@/components/general/PageHeader';
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
      <PageHeader title="Users" icon={PeopleIcon} />
      <Divider sx={{ my: 3 }} />
      <Card>
        <UsersTable />
      </Card>
    </UserLayout>
  );
};

export default Users;

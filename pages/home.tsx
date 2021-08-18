import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Typography, Divider } from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import { getDaypart } from '@/utils/time';

const Home: NextPage = (): ReactElement => {
  const { currentUser } = useAuth();

  return (
    <UserLayout title="Home">
      <Typography variant="h3">
        {`Good${getDaypart()}`}, {currentUser?.displayName}
      </Typography>
      <Divider sx={{ my: 3 }} />
    </UserLayout>
  );
};

export default Home;

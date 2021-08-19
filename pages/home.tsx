import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Typography, Divider } from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import { getDaypart } from '@/utils/time';

const Home: NextPage = (): ReactElement => {
  const { currentUser }: { currentUser: any } = useAuth();

  return (
    <UserLayout
      title="Home"
      sx={{
        pt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
      }}
    >
      <Typography variant="h3">
        {`Good${getDaypart()}`}, {currentUser?.displayName}
      </Typography>
      <Divider sx={{ my: 3 }} />
    </UserLayout>
  );
};

export default Home;

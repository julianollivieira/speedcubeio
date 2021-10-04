import { ReactElement, ReactNode } from 'react';
import { Box } from '@mui/material';
import { UserProvider } from '@/hooks/useUser';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props): ReactElement => {
  return (
    <UserProvider>
      <Box>{children}</Box>
    </UserProvider>
  );
};

export default Layout;

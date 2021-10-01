import { ReactElement, ReactNode } from 'react';
import { Box } from '@mui/material';
import { UserProvider } from '@/hooks/useUser';
import { BoxProvider } from '@/hooks/useBoxes';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props): ReactElement => {
  return (
    <UserProvider>
      <BoxProvider>
        <Box>{children}</Box>
      </BoxProvider>
    </UserProvider>
  );
};

export default Layout;

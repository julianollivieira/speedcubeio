import { ReactNode, ReactElement } from 'react';
import NavigationBar from '@/components/navigation/NavigationBar';
import { Box } from '@mui/material';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props): ReactElement => {
  return (
    <>
      <NavigationBar />
      <Box sx={{ pt: '64px' }}>{children}</Box>
    </>
  );
};

export default Layout;

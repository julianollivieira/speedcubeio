import { ReactNode, ReactElement } from 'react';
import NavigationBar from '@/components/navigation/NavigationBar';
import { Box } from '@material-ui/core';

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

import { ReactNode, ReactElement } from 'react';
import NavigationBar from '@/components/navigation/NavigationBar';
import { Box } from '@mui/material';

interface Props {
  children: ReactNode;
  sx?: any;
}

const Layout = ({ children, sx }: Props): ReactElement => {
  return (
    <>
      <NavigationBar />
      <Box sx={{ pt: '64px' }}>
        <Box sx={sx}>{children}</Box>
      </Box>
    </>
  );
};

export default Layout;

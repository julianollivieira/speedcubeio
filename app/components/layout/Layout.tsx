import { ReactNode, ReactElement } from 'react';
import NavigationBar from '@/components/navigation/NavigationBar';
import { Box } from '@mui/material';
import Head from 'next/head';

interface Props {
  title?: string | null;
  children: ReactNode;
  sx?: any;
}

const Layout = (props: Props): ReactElement => {
  const { title, children, sx } = props;

  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : ''}Speedcube.io</title>
      </Head>
      <NavigationBar />
      <Box sx={sx}>{children}</Box>
    </>
  );
};

export default Layout;

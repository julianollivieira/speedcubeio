import { ReactElement, ReactNode } from 'react';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import redirectIfUnauthenticated from '@/hooks/redirectIfUnauthenticated';
import { Box, CircularProgress } from '@mui/material';

interface Props {
  children: ReactNode;
  inverse?: boolean;
}

const RequireAuthenticated = ({ children, inverse = false }: Props): ReactElement => {
  const [user] = useAtom(userAtom);

  redirectIfUnauthenticated(user, inverse);

  if ((user === null && !inverse) || (user !== null && user?.emailVerified && inverse)) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return <>{children}</>;
  }
};

export default RequireAuthenticated;

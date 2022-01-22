import { ReactElement, ReactNode } from 'react';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import redirectIfAuthenticated from '@/hooks/redirectIfAuthenticated';
import { Box, CircularProgress } from '@mui/material';

interface Props {
  children: ReactNode;
}

const RequireUnauthenticated = ({ children }: Props): ReactElement => {
  const [user] = useAtom(userAtom);

  redirectIfAuthenticated(user);

  return (
    <>
      {user === undefined ? (
        children
      ) : (
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
      )}
    </>
  );
};

export default RequireUnauthenticated;

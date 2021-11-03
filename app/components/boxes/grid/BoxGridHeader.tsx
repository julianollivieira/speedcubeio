import { ReactElement } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Link from '@/components/misc/Link';
import {
  Person as PersonIcon,
  AllInbox as AllInboxIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import type { User } from 'firebase/auth';

interface Props {
  title: string;
  user: User | null | undefined;
  showControls?: boolean;
}

const profilePictureHeight = '60px';

const BoxGridHeader = ({ title, user, showControls = false }: Props): ReactElement => {
  const handleShare = () => {
    console.log(`localhost:3000/users/${user?.uid}/boxes`);
  };

  return (
    <Box
      sx={{
        py: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: profilePictureHeight,
            width: profilePictureHeight,
          }}
        >
          <AllInboxIcon sx={{ fontSize: '1em' }} />
        </Typography>
        <Typography
          variant="h3"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: { xs: '2em', md: '3em' },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box>
        {showControls && (
          <>
            <IconButton size="large" onClick={handleShare}>
              <ShareIcon />
            </IconButton>
            <Link href={`/users/${user?.uid}`} passHref sx={{ pt: 3 }}>
              <IconButton size="large">
                <PersonIcon />
              </IconButton>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BoxGridHeader;

import {
  AllInbox as AllInboxIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Verified as VerifiedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { Avatar, Box, Chip, IconButton, Typography, useMediaQuery } from '@mui/material';
import Link from '@/components/misc/Link';
import { ReactElement, useState } from 'react';
import type { Profile } from '@/types';
import type { User } from 'firebase/auth';
import { useData } from '@/hooks/useData';
import createSnackbar from '@/utils/snackbar';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface Props {
  user: User | null | undefined;
  profile: Profile | null;
  showControls?: boolean;
}

const ProfileHeader = ({ user, profile, showControls = false }: Props): ReactElement => {
  const { setProfilePrivate } = useData();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [visibilityLoading, setVisibilityLoading] = useState(false);

  const toggleVisibility = () => {
    setVisibilityLoading(true);
    setProfilePrivate(!profile?.isPrivate).then((isPrivate) => {
      setVisibilityLoading(false);
      createSnackbar(
        enqueueSnackbar,
        closeSnackbar,
        `Profile set to ${isPrivate ? 'private' : 'public'}`,
        'success'
      );
    });
  };

  const handleShare = () => {
    console.log(`localhost:3000/users/${user?.uid}`);
  };

  const matches = useMediaQuery((theme: any) => theme.breakpoints.between('sm', 'lg'));
  const profilePictureHeight = matches ? 120 : 150;

  return (
    <Box sx={{ py: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box sx={{ pb: { xs: 3, sm: 0 }, display: 'flex', justifyContent: 'center' }}>
        <Avatar
          src={user?.photoURL ?? ''}
          sx={{
            border: 1,
            borderRadius: '50%',
            height: profilePictureHeight,
            width: profilePictureHeight,
          }}
        />
      </Box>
      <Box
        sx={{
          width: { xs: 1, sm: `calc(100% - ${profilePictureHeight}px)` },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            height: { sm: `${profilePictureHeight}px` },
            pl: { xs: 0, sm: 3 },
            width: { xs: 1, md: 'calc(100% - 220px)' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Box
            sx={{
              width: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <Typography
              sx={{
                fontSize: '2.5em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              variant="h3"
            >
              {user ? user?.displayName : 'User not found'}
            </Typography>
            {profile?.isVerified ? (
              <VerifiedIcon color="info" fontSize="large" sx={{ ml: 2 }} />
            ) : (
              ''
            )}
          </Box>
          {user && (
            <>
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
                variant="subtitle1"
              >
                {'Joined on '}
                {dayjs(user?.metadata.creationTime).utc().format('MMMM D YYYY')}
              </Typography>
              <Box sx={{ pt: { xs: 3, sm: 1 } }}>
                <>
                  <Chip
                    color="error"
                    label="PRO MEMBER"
                    size="small"
                    sx={{ px: 1, mr: 1, fontWeight: 'bold' }}
                  />
                  <Chip
                    color="warning"
                    label="BETA TESTER"
                    size="small"
                    sx={{ px: 1, mr: 1, fontWeight: 'bold' }}
                  />
                </>
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            pt: { xs: 3, md: 0 },
            pr: { sm: `${profilePictureHeight}px`, md: 0 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-end' },
            width: { xs: 1, md: '220px' },
          }}
        >
          <IconButton size="large" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          {profile !== null && (
            <Link href={`/users/${user?.uid}/boxes`} passHref>
              <IconButton size="large">
                <AllInboxIcon />
              </IconButton>
            </Link>
          )}
          {showControls && (
            <>
              <IconButton
                size="large"
                onClick={toggleVisibility}
                disabled={visibilityLoading}
              >
                {!profile?.isPrivate ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
              <IconButton size="large">
                <EditIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;

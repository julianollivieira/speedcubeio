import {
  AllInbox as AllInboxIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Verified as VerifiedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { Avatar, Box, Chip, Grid, IconButton, Typography } from '@mui/material';
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
  profile: Profile | undefined;
  showControls?: boolean;
  hide: boolean;
}

const ProfileHeader = ({
  user,
  profile,
  showControls = false,
  hide,
}: Props): ReactElement => {
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

  return (
    <Grid container sx={{ py: 3 }}>
      <Grid
        item
        lg={2}
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
        xs={12}
      >
        <Avatar
          src={user?.photoURL ?? ''}
          sx={{
            border: 1,
            borderRadius: '50%',
            height: 150,
            mb: { xs: 5, lg: 0 },
            width: 150,
          }}
        />
      </Grid>
      <Grid item lg={8} sx={{ display: 'flex', alignItems: 'center' }} xs={12}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              pl: 3,
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: { xs: 'center', lg: 'flex-start' },
              }}
            >
              <Typography sx={{ fontSize: { xs: '2em', lg: '2.5em' } }} variant="h3">
                {user ? user?.displayName : 'User not found'}
              </Typography>
              {profile?.isVerified ? (
                <VerifiedIcon color="info" fontSize="large" sx={{ ml: 2 }} />
              ) : (
                ''
              )}
            </Box>
            <Typography
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', lg: 'flex-start' },
              }}
              variant="subtitle1"
            >
              {'Joined on '}
              {dayjs(user?.metadata.creationTime).utc().format('MMMM D YYYY')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', lg: 'flex-start' },
                my: 1,
              }}
            >
              <Box>
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
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      {user ? (
        <Grid
          item
          lg={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: { xs: 3, lg: 0 },
          }}
          xs={12}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton size="large" onClick={handleShare}>
              <ShareIcon />
            </IconButton>
            {showControls ? (
              <>
                <IconButton
                  size="large"
                  sx={{ display: { xs: 'none', lg: 'flex' } }}
                  onClick={toggleVisibility}
                  disabled={visibilityLoading}
                >
                  {!profile?.isPrivate ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                <IconButton size="large" sx={{ display: { xs: 'none', lg: 'flex' } }}>
                  <EditIcon />
                </IconButton>
              </>
            ) : hide ? (
              ''
            ) : (
              <Link href={`/users/${user.uid}/boxes`} passHref>
                <IconButton size="large">
                  <AllInboxIcon />
                </IconButton>
              </Link>
            )}
          </Box>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default ProfileHeader;

import {
  AllInbox as AllInboxIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Fab,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import Link from '@/components/misc/Link';
import SocialChipList from '@/components/profile/SocialChipList';
import type { User } from 'firebase/auth';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { ReactElement } from 'react';
dayjs.extend(utc);
import type { Profile as ProfileType } from '@/types';

interface Props {
  user: User | null | undefined;
  profile: ProfileType | undefined;
  showControls?: boolean;
}

const Profile = ({ user, profile, showControls }: Props): ReactElement => {
  const handleShare = () => {
    console.log(`localhost:3000/users/${user?.uid}`);
  };
  return (
    <>
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
          {user ? (
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
                    {user.displayName}
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
                  {dayjs(user.metadata.creationTime).utc().format('MMMM D YYYY')}
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
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  pl: { xs: 0, lg: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', lg: 'flex-start' },
                  }}
                >
                  <Typography sx={{ fontSize: { xs: '2em', lg: '2.5em' } }} variant="h3">
                    User not found
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
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
                <IconButton size="large" sx={{ display: { xs: 'none', lg: 'flex' } }}>
                  <EditIcon />
                </IconButton>
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
      <Divider sx={{ mb: 3 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 3,
          justifyContent: { xs: 'center', lg: 'flex-start' },
        }}
      >
        <SocialChipList socialLinks={profile?.socialLinks} />
      </Box>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Socials" />
              <CardContent></CardContent>
            </Card>
          </Grid> */}
        {/* <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Bio" />
            <CardContent>{user?.bio}</CardContent>
          </Card>
        </Grid> */}
      </Grid>
      {/* {loggedInUser && showControls ? (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            right: 25,
            bottom: 25,
            display: { xs: 'flex', lg: 'none' },
          }}
        >
          <EditIcon />
        </Fab>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default Profile;

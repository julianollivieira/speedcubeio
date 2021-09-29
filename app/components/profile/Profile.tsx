import {
  Fab,
  Grid,
  Avatar,
  Box,
  Typography,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Verified as VerifiedIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  AllInbox as AllInboxIcon,
} from '@mui/icons-material';
import Link from '@/components/misc/Link';
import SocialChipList from '@/components/profile/SocialChipList';
import { User } from '@/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAuth } from '@/hooks/useAuth';
dayjs.extend(utc);

interface Props {
  user: User | null | undefined;
  showControls?: boolean;
}

const Profile = ({ user, showControls }: Props) => {
  const { user: loggedInUser } = useAuth();

  return (
    <>
      <Grid container sx={{ py: 3 }}>
        <Grid
          item
          xs={12}
          lg={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            src={user?.profilePicture}
            sx={{
              height: 150,
              width: 150,
              borderRadius: '50%',
              border: 1,
              mb: { xs: 5, lg: 0 },
            }}
          />
        </Grid>
        <Grid item xs={12} lg={8} sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
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
                  pl: 3,
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
                  <Typography variant="h3" sx={{ fontSize: { xs: '2em', lg: '2.5em' } }}>
                    {user?.displayName}
                  </Typography>
                  {user?.isVerified ? (
                    <VerifiedIcon sx={{ ml: 2 }} color="info" fontSize="large" />
                  ) : (
                    <></>
                  )}
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', lg: 'flex-start' },
                  }}
                >
                  Joined on {dayjs(user?.joinDate).utc().format('MMMM D YYYY')}
                </Typography>
                <Box
                  sx={{
                    my: 1,
                    display: 'flex',
                    justifyContent: { xs: 'center', lg: 'flex-start' },
                  }}
                >
                  <Box>
                    <Chip
                      label="PRO MEMBER"
                      color="error"
                      size="small"
                      sx={{ px: 1, mr: 1, fontWeight: 'bold' }}
                    />
                    <Chip
                      label="BETA TESTER"
                      color="warning"
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
                  <Typography variant="h3" sx={{ fontSize: { xs: '2em', lg: '2.5em' } }}>
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
            xs={12}
            lg={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: { xs: 3, lg: 0 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <IconButton onClick={copyProfileLinkToClipboard} size="large"> */}
              <IconButton size="large">
                <ShareIcon />
              </IconButton>
              {loggedInUser?.id !== user?.id ? (
                <Link href={`/users/${user?.id}/boxes`} passHref>
                  <IconButton size="large">
                    <AllInboxIcon />
                  </IconButton>
                </Link>
              ) : (
                <></>
              )}
              {loggedInUser && showControls ? (
                <IconButton size="large" sx={{ display: { xs: 'none', lg: 'flex' } }}>
                  <EditIcon />
                </IconButton>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        ) : (
          <></>
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
        <SocialChipList socialLinks={user?.socialLinks} />
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
      {loggedInUser && showControls ? (
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
      )}
    </>
  );
};

export default Profile;

import { ReactElement } from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Fab,
  Chip,
} from '@mui/material';
import {
  Share as ShareIcon,
  Edit as EditIcon,
  Verified as VerifiedIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import ProfilePicture from '@/components/general/ProfilePicture';
import SocialChip from '@/components/general/SocialChip';
import { useSnackbar } from 'notistack';
import { FullUser } from '@/types/User';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface Props {
  user: FullUser | null | undefined;
}

const Profile = (props: Props): ReactElement => {
  const { user } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const copyProfileLinkToClipboard = () => {
    navigator.clipboard
      .writeText(`https://speedcube.io/users/${user?.uid}`)
      .then(
        () => {
          enqueueSnackbar('Profile link copied to clipboard', {
            variant: 'success',
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)}>
                <CloseIcon />
              </IconButton>
            ),
          });
        },
        () => {
          enqueueSnackbar(
            "Something wen't wrong, profile link not copied to clipboard",
            {
              variant: 'error',
              action: (key) => (
                <IconButton onClick={() => closeSnackbar(key)}>
                  <CloseIcon />
                </IconButton>
              ),
            }
          );
        }
      );
  };

  return (
    <>
      <Container>
        <Grid container>
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
            <ProfilePicture
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
          <Grid
            item
            xs={12}
            lg={8}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
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
                  <Typography
                    variant="h3"
                    sx={{ fontSize: { xs: '2em', lg: '2.5em' } }}
                  >
                    {user?.displayName}
                  </Typography>
                  <VerifiedIcon sx={{ ml: 2 }} color="info" fontSize="large" />
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
          </Grid>
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
              <IconButton onClick={copyProfileLinkToClipboard} size="large">
                <ShareIcon />
              </IconButton>
              <IconButton
                size="large"
                sx={{ display: { xs: 'none', lg: 'flex' } }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            mb: 3,
            justifyContent: { xs: 'center', lg: 'flex-start' },
          }}
        >
          {user?.socials.map((social) => (
            <SocialChip social={social} key={social.id} />
          ))}
        </Box>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Socials" />
              <CardContent></CardContent>
            </Card>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Bio" />
              <CardContent>{user?.bio}</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
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
    </>
  );
};

export default Profile;

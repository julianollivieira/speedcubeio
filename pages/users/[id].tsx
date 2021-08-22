import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import {
  Box,
  Chip,
  Typography,
  Container,
  Divider,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Fab,
} from '@material-ui/core';
import { Edit as EditIcon, Verified as VerifiedIcon } from '@material-ui/icons';
import UserLayout from '@/components/layout/UserLayout';
import ProfilePicture from '@/components/general/ProfilePicture';
import SocialChip from '@/components/general/SocialChip';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const Profile: NextPage = (): ReactElement => {
  const { currentUser }: { currentUser: any } = useAuth();
  return (
    <UserLayout
      title={currentUser?.displayName}
      sx={{
        pt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
      }}
    >
      <Container maxWidth="lg" sx={{ px: 0 }}>
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
            lg={10}
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
                    {currentUser?.displayName}
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
                  Joined on the{' '}
                  {dayjs(currentUser?.metadata.creationTime)
                    .utc()
                    .format('MMMM D[th] YYYY')}
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
              <Box sx={{ pr: 4, display: { xs: 'none', lg: 'flex' } }}>
                <IconButton size="large">
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            justifyContent: { xs: 'center', lg: 'flex-start' },
          }}
        >
          <SocialChip type="YouTube" color="#FF0000" href="#" />
          <SocialChip type="Twitter" color="#1DA1F2" href="#" />
          <SocialChip type="Instagram" color="#405DE6" href="#" />
          <SocialChip type="Facebook" color="#4267B2" href="#" />
          <SocialChip type="Reddit" color="#FF5700" href="#" />
          <SocialChip type="Discord" color="#5865F2" href="#" />
          <SocialChip type="Twitch" color="#6441a5 " href="#" />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Socials" />
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Bio" />
              <CardContent></CardContent>
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
    </UserLayout>
  );
};

export default Profile;

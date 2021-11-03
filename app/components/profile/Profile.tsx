import { Box, Divider } from '@mui/material';
import SocialChipList from '@/components/profile/SocialChipList';
import type { User } from 'firebase/auth';
import { ReactElement } from 'react';
import type { Profile as ProfileType } from '@/types';
import ProfileHeader from '@/components/profile/ProfileHeader';

interface Props {
  user: User | null | undefined;
  profile: ProfileType | null;
  showControls?: boolean;
}

const Profile = ({ user, profile, showControls = false }: Props): ReactElement => {
  return (
    <>
      <ProfileHeader user={user} profile={profile} showControls={showControls} />
      <Divider sx={{ mb: 3 }} />
      {profile !== null ? (
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
      ) : (
        'Profile is private'
      )}
    </>
  );
};

export default Profile;

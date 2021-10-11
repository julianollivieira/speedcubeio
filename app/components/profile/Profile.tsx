import { Box, Divider } from '@mui/material';
import SocialChipList from '@/components/profile/SocialChipList';
import type { User } from 'firebase/auth';
import { ReactElement } from 'react';
import type { Profile as ProfileType } from '@/types';
import ProfileHeader from '@/components/profile/ProfileHeader';

interface Props {
  user: User | null | undefined;
  profile: ProfileType | undefined;
  showControls?: boolean;
  hideIfPrivate?: boolean;
}

const Profile = ({
  user,
  profile,
  showControls = false,
  hideIfPrivate = false,
}: Props): ReactElement => {
  const hide = (profile?.isPrivate ?? true) && hideIfPrivate;

  return (
    <>
      <ProfileHeader
        hide={hide}
        user={user}
        profile={profile}
        showControls={showControls}
      />
      <Divider sx={{ mb: 3 }} />
      {hide ? (
        ''
      ) : (
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
      )}
      {/* TODO: Add fabs here */}
    </>
  );
};

export default Profile;

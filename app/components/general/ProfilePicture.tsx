import { ReactElement } from 'react';
import { Avatar } from '@material-ui/core';
import { useAuth } from '@/utils/auth';

const ProfilePicture = (props: any): ReactElement => {
  const { currentUser }: { currentUser: any } = useAuth();
  return (
    <Avatar
      alt={`${currentUser?.displayName}'s profile picture`}
      src={false ? '' : '/images/default_user_profile.jpg'}
      {...props}
    />
  );
};

export default ProfilePicture;

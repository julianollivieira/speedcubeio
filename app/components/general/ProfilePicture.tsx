import { ReactElement } from 'react';
import { Avatar } from '@mui/material';

interface Props {
  src?: string | undefined;
  sx?: any;
}

const ProfilePicture = (props: Props): ReactElement => {
  console.log('⬛ [RR] ProfilePicture');
  return (
    <Avatar
      alt="Your profile picture"
      src={props.src ?? '/images/default_user_profile.jpg'}
      sx={props.sx}
    />
  );
};

export default ProfilePicture;

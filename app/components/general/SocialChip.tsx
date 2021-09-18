import { ReactElement } from 'react';
import { Chip, SvgIcon } from '@mui/material';
import { Social } from '@/utils/socials';

interface Props {
  social: Social;
}

const Logo = (props: Props): ReactElement => {
  const { social } = props;

  return (
    <Chip
      clickable
      component="a"
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      label={social.name}
      size="small"
      sx={{ my: 1, mx: 0.5, px: 1, bgcolor: social.color, color: '#FFF' }}
      icon={
        <SvgIcon
          sx={{ height: 1, p: social.padding, fill: '#FFF' }}
          component={social.icon}
          viewBox={social.viewBox ? social.viewBox : undefined}
        />
      }
    />
  );
};

export default Logo;

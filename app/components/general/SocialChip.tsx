import { ReactElement } from 'react';
import { Chip, SvgIcon } from '@mui/material';

import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import DiscordIcon from '@/public/images/icons/discord.svg';
import TwitchIcon from '@/public/images/icons/twitch.svg';

const Logo = (props: any): ReactElement => {
  const { type, color, href, ...other } = props;

  let icon = null;
  let viewBox = null;
  let padding = undefined;

  switch (type) {
    case 'YouTube':
      icon = YouTubeIcon;
      break;
    case 'Twitter':
      icon = TwitterIcon;
      break;
    case 'Instagram':
      icon = InstagramIcon;
      break;
    case 'Facebook':
      icon = FacebookIcon;
      break;
    case 'Reddit':
      icon = RedditIcon;
      break;
    case 'Discord':
      icon = DiscordIcon;
      viewBox = '0 0 71 55';
      break;
    case 'Twitch':
      icon = TwitchIcon;
      viewBox = '0 0 2400 2800';
      padding = 0.3;
      break;
    default:
      break;
  }

  return (
    <Chip
      clickable
      component="a"
      href={href}
      label={type}
      size="small"
      sx={{ my: 1, mx: 0.5, px: 1, bgcolor: color, color: '#FFF' }}
      icon={
        <SvgIcon
          {...other}
          sx={{ height: 1, p: padding, fill: '#FFF' }}
          component={icon}
          viewBox={viewBox ? viewBox : undefined}
        />
      }
    />
  );
};

export default Logo;

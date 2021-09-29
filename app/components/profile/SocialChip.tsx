import { Chip, SvgIcon } from '@mui/material';
import { ReactElement } from 'react';

interface Props {
  name: string;
  color: string;
  icon: any;
  viewBox?: string;
  padding?: number;
  href?: string;
}

const SocialChip = ({
  name,
  color,
  icon,
  viewBox,
  padding,
  href,
}: Props): ReactElement => {
  return (
    <Chip
      clickable
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      label={name}
      size="small"
      sx={{ my: 1, mx: 0.5, px: 1, bgcolor: color, color: '#FFF' }}
      icon={
        <SvgIcon
          sx={{ height: 1, p: padding, fill: '#FFF' }}
          component={icon}
          viewBox={viewBox ? viewBox : undefined}
        />
      }
    />
  );
};

export default SocialChip;

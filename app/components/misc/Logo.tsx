import { ReactElement } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

interface Props {
  sx: SxProps;
  expanded?: boolean;
}

const Logo = ({ sx, expanded }: Props): ReactElement => {
  const theme = useTheme();

  return (
    <Box
      component="img"
      src={`/images/logo_${expanded ? 'large' : 'small'}_${theme.palette.mode}.png`}
      sx={sx}
    />
  );
};

export default Logo;

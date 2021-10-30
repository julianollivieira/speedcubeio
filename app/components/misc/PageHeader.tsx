import { SvgIconComponent } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { createElement, ReactElement } from 'react';

interface Props {
  title: string;
  icon: SvgIconComponent;
}

const PageHeader = ({ title, icon }: Props): ReactElement => {
  return (
    <Box
      sx={{
        py: 3,
        display: 'flex',
        justifyContent: { xs: 'center', lg: 'start' },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {createElement(icon, {
          sx: { fontSize: '1em' },
        })}
      </Typography>
      <Typography
        variant="h3"
        sx={{ ml: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;

import { SvgIconComponent } from '@mui/icons-material';
import { Box, Typography, Divider } from '@mui/material';
import { createElement, ReactElement, ReactNode } from 'react';

interface Props {
  title: ReactNode;
  icon: SvgIconComponent;
}

const DefaultPageHeader = ({ title, icon }: Props): ReactElement => {
  return (
    <>
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
          sx={{
            ml: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
    </>
  );
};

export default DefaultPageHeader;

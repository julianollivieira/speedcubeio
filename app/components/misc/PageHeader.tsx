import { SvgIconComponent } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { createElement } from 'react';

interface Props {
  title: string;
  icon: SvgIconComponent;
}

const PageHeader = ({ title, icon }: Props) => {
  return (
    <Box
      sx={{
        py: 3,
        display: 'flex',
        justifyContent: { xs: 'center', lg: 'start' },
      }}
    >
      <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center' }}>
        {createElement(icon, {
          sx: { fontSize: '1em', mr: 2 },
        })}
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;

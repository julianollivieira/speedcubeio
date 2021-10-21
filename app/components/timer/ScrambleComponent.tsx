import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useData } from '@/hooks/useData';

const ScrambleComponent = (): ReactElement => {
  const { scramble } = useData();

  return (
    <Box sx={{ height: 1, display: 'flex', alignItems: 'start', textAlign: 'center' }}>
      <Typography
        variant="h4"
        color="textPrimary"
        sx={{ fontSize: { xs: 20, sm: 20, md: 20, lg: 20, xl: 30 } }}
      >
        {scramble?.scramble_string}
      </Typography>
    </Box>
  );
};

export default ScrambleComponent;

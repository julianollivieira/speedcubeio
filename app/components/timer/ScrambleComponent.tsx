import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useData } from '@/hooks/useData';

const ScrambleComponent = (): ReactElement => {
  const { scramble } = useData();

  return (
    <Box sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
      <Typography variant="h4" color="textPrimary">
        {scramble?.scramble_string}
      </Typography>
    </Box>
  );
};

export default ScrambleComponent;

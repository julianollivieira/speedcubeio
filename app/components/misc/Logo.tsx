import { Box, Theme, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { ReactElement } from 'react';

interface Props {
  expanded?: boolean;
  sx?: SxProps<Theme>;
}

const Logo = ({ expanded, sx }: Props): ReactElement => {
  return (
    <Box sx={sx}>
      <Box
        sx={{
          height: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 241 278"
          sx={{ height: 1 }}
        >
          <Box
            component="path"
            sx={{ stroke: (theme) => theme.palette.text.primary }}
            fill="none"
            strokeWidth="10"
            d="M 120.50,190.71
       C 120.50,190.71 120.50,136.98 120.50,136.98M 166.37,111.34
       C 166.37,111.34 120.50,136.98 120.50,136.98M 5.00,72.38
       C 5.00,72.38 120.50,136.98 120.50,136.98M 5.00,205.62
       C 5.00,205.62 74.63,164.25 74.63,164.25M 120.50,272.23
       C 120.50,272.23 120.50,190.71 120.50,190.71M 236.00,205.62
       C 236.00,205.62 166.37,164.25 166.37,164.25M 236.00,72.38
       C 236.00,72.38 166.37,111.34 166.37,111.34M 120.50,5.77
       C 120.50,5.77 120.50,84.87 120.50,84.87M 236.00,205.62
       C 236.00,205.62 236.00,72.38 236.00,72.38
         236.00,72.38 120.50,5.77 120.50,5.77
         120.50,5.77 5.00,72.38 5.00,72.38
         5.00,72.38 5.00,205.62 5.00,205.62
         5.00,205.62 120.50,272.23 120.50,272.23
         120.50,272.23 236.00,205.62 236.00,205.62 Z
       M 166.37,164.25
       C 166.37,164.25 166.37,111.34 166.37,111.34
         166.37,111.34 120.50,84.88 120.50,84.88
         120.50,84.88 74.63,111.34 74.63,111.34
         74.63,111.34 74.63,164.25 74.63,164.25
         74.63,164.25 120.50,190.71 120.50,190.71
         120.50,190.71 166.37,164.25 166.37,164.25 Z"
          />
        </Box>

        {expanded ? (
          <Typography variant="h5" sx={{ ml: 1.5 }} color="textPrimary">
            Speedcube.io
          </Typography>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Logo;

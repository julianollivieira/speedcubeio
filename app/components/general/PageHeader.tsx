import { ReactElement, ComponentType } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  icon: ComponentType<SvgIconProps>;
}

const PageHeader = (props: Props): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', lg: 'start' },
      }}
    >
      <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center' }}>
        <props.icon sx={{ fontSize: '1em', mr: 2 }} />
        {props.title}
      </Typography>
    </Box>
  );
};

export default PageHeader;

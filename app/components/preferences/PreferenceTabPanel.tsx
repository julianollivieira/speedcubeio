import { ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';

interface PreferenceTabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const PreferenceTabPanel = (props: PreferenceTabPanelProps): ReactElement => {
  const { children, value, index, ...other } = props;

  return (
    <Box hidden={value !== index} {...other} sx={{ flexGrow: 1 }}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PreferenceTabPanel;

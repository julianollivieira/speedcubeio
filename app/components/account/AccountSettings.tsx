import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { Security as SecurityIcon, Email as EmailIcon } from '@mui/icons-material';
import { SyntheticEvent, useState, ReactElement } from 'react';
import { useData } from '@/hooks/useData';
import SecuritySettings from '@/components/account/SecuritySettings';

const AccountSettings = (): ReactElement => {
  const matches: boolean = useMediaQuery('(min-width:1200px)');
  const [value, setValue] = useState(0);
  const { user } = useData();

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
      <Tabs
        orientation={matches ? 'vertical' : 'horizontal'}
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
      >
        <Tab
          label={
            <Box>
              <EmailIcon />
              <Typography variant="body2">Email</Typography>
            </Box>
          }
        />
        <Tab
          label={
            <Box>
              <SecurityIcon />
              <Typography variant="body2">Security</Typography>
            </Box>
          }
        />
      </Tabs>
      <Box hidden={value !== 0}>
        <Box
          sx={{
            pt: 3,
            px: { xs: 0, lg: 5 },
            pb: { xs: 0, lg: 3 },
            minWidth: { md: '600px' },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Email address
          </Typography>
          <Box sx={{ pt: 4 }}>
            <Typography variant="h6">Your current email address</Typography>
            <Typography sx={{ mt: 1 }}>
              Your current email address is {user?.email}
            </Typography>
          </Box>
          <Box sx={{ pt: 4, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">Change your email address</Typography>
            <TextField
              name="email"
              label="New email address"
              variant="outlined"
              sx={{ mt: 1 }}
            />
            <Button variant="contained" sx={{ width: 'fit-content', px: 3, mt: 1 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
      <Box hidden={value !== 1}>
        <SecuritySettings />
      </Box>
    </Box>
  );
};

export default AccountSettings;

import { ReactElement, useState } from 'react';
import {
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  Security as SecurityIcon,
  AlternateEmail as AlternateEmailIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '@/utils/auth';

const AccountSettings = (props: any): ReactElement => {
  const matches: boolean = useMediaQuery('(min-width:1200px)');
  const [value, setValue] = useState(0);
  const { currentUser } = useAuth();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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
              <AlternateEmailIcon />
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
        <Tab
          label={
            <Box>
              <DeleteIcon />
              <Typography variant="body2">Delete</Typography>
            </Box>
          }
        />
      </Tabs>
      {/*  */}
      <Box hidden={value !== 0} sx={{ flexGrow: 1 }}>
        {value === 0 && (
          <Box sx={{ pt: 3, px: { xs: 0, lg: 3 }, pb: { xs: 0, lg: 3 } }}>
            <Typography variant="h6">Email settings</Typography>
            <Box sx={{ pt: 2 }}>
              <Typography sx={{ mb: 2 }}>
                Your email is: {currentUser?.email}
              </Typography>
              <Button variant="contained">Change email</Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box hidden={value !== 1} sx={{ flexGrow: 1 }}>
        {value === 1 && (
          <Box sx={{ pt: 3, px: { xs: 0, lg: 3 }, pb: { xs: 0, lg: 3 } }}>
            <Typography variant="h6">Security settings</Typography>
            <Box sx={{ pt: 2 }}>
              <Button variant="contained">Change password</Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box hidden={value !== 2} sx={{ flexGrow: 1 }}>
        {value === 2 && (
          <Box sx={{ pt: 3, px: { xs: 0, lg: 3 }, pb: { xs: 0, lg: 3 } }}>
            <Typography variant="h6">Delete your account</Typography>
            <Box sx={{ pt: 2 }}>
              <Button variant="contained" color="error">
                Delete account
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* {preferences.categories.map(
        (category: PreferenceCategory, index: number) => (
          <PreferenceTabPanel value={value} index={index}>
            <PreferenceSettingTab
              category={category}
              storedPreferences={preferenceManager.preferences}
              onPreferenceChange={onPreferenceChange}
            />
          </PreferenceTabPanel>
        )
      )} */}
    </Box>
  );
};

export default AccountSettings;

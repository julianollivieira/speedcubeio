import { ReactElement, useState } from 'react';
import { Box, Tabs, Tab, Typography, useMediaQuery } from '@material-ui/core';
import preferences, { PreferenceCategory } from '@/utils/preferences';
import PreferenceTabPanel from '@/components/preferences/PreferenceTabPanel';
import PreferenceSettingTab from '@/components/preferences/PreferenceSettingTab';
import PreferenceManager from '@/classes/PreferenceManager';

const Preferences = (props: any): ReactElement => {
  const matches: boolean = useMediaQuery('(min-width:1200px)');
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const preferenceManager = new PreferenceManager();

  const onPreferenceChange = (id: string, value: any) =>
    preferenceManager.changePreference(id, value);

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
      <Tabs
        orientation={matches ? 'vertical' : 'horizontal'}
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
      >
        {preferences.categories.map(
          (category: PreferenceCategory, index: number) => (
            <Tab
              label={
                <Box>
                  <category.icon />
                  <Typography variant="body2">{category.name}</Typography>
                </Box>
              }
            />
          )
        )}
      </Tabs>
      {preferences.categories.map(
        (category: PreferenceCategory, index: number) => (
          <PreferenceTabPanel value={value} index={index}>
            <PreferenceSettingTab
              category={category}
              storedPreferences={preferenceManager.preferences}
              onPreferenceChange={onPreferenceChange}
            />
          </PreferenceTabPanel>
        )
      )}
    </Box>
  );
};

export default Preferences;

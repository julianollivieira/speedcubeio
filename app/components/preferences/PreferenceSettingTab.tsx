import { ReactElement } from 'react';
import { Typography, List } from '@material-ui/core';
import { Preference, PreferenceCategory } from '@/utils/preferences';
import PreferenceSettingItem from '@/components/preferences/PreferenceSettingItem';

interface PreferenceSettingTabProps {
  className?: any;
  category: PreferenceCategory;
  storedPreferences: any;
  onPreferenceChange: Function;
}

const PreferenceSettingTab = (
  props: PreferenceSettingTabProps
): ReactElement => {
  return (
    <>
      <Typography variant="h6">{props.category.name} settings</Typography>
      <List>
        {props.category.preferences.map(
          (preference: Preference, index: number) => (
            <PreferenceSettingItem
              preference={preference}
              storedPreference={props.storedPreferences.find(
                (storedPreference: Preference) =>
                  storedPreference.id == preference.id
              )}
              onPreferenceChange={props.onPreferenceChange}
            />
          )
        )}
      </List>
    </>
  );
};

export default PreferenceSettingTab;

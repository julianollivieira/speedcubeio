import { ReactElement } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@material-ui/core';
import { Preference } from '@/utils/preferences';

interface Props {
  preference: Preference;
  storedPreference: any;
  onPreferenceChange: Function;
}

const PreferenceSettingItem = (props: Props): ReactElement => {
  const onChange = (event: any) => {
    // TODO: FIX TYPING
    props.onPreferenceChange(props.preference.id, event.target.checked);
  };
  return (
    <ListItem>
      <ListItemText
        primary={props.preference.name}
        secondary={props.preference.description}
      />
      <ListItemSecondaryAction>
        <Switch
          name="checkedA"
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          defaultChecked={
            props.storedPreference?.value ?? props.preference.default
          }
          onChange={onChange}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PreferenceSettingItem;

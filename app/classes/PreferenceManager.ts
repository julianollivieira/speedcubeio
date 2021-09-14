import preferences from '@/utils/preferences';
import { Preference, PreferenceCategory } from '@/utils/preferences';

interface PreferenceValue {
  id: string;
  value: string;
}

class PreferenceManager {
  preferences: Array<PreferenceValue> = [];

  public constructor() {
    this.loadPreferences();
  }

  private loadPreferences(): void {
    const storedPreferences = JSON.parse(localStorage.getItem('preferences'));
    this.preferences = <Array<PreferenceValue>>storedPreferences ?? [];
  }

  private storePreferences(): void {
    localStorage.setItem('preferences', JSON.stringify(this.preferences));
  }

  public changePreference(id: string, value: any): void {
    const existingPreference = this.preferences.find(
      (preference: PreferenceValue) => preference.id == id
    );

    const fullPreference = this.findFullPreference(id);

    // If preference already exists, change the value. If not add it
    if (existingPreference) {
      // If preference already exists but is changed to the default value, remove it.
      if (value == fullPreference.default) {
        const preferenceValueIndex = this.preferences
          .map((preference: PreferenceValue) => preference.id)
          .indexOf(id);
        this.preferences.splice(preferenceValueIndex, 1);
      } else {
        existingPreference.value = value;
      }
    } else {
      // Only add to preferences if is not the same as default value
      if (value != fullPreference.default) {
        this.preferences.push(<PreferenceValue>{ id: id, value: value });
      } else {
      }
    }
    this.storePreferences();
  }

  private findFullPreference(id: string): Preference {
    let found: any = null;
    try {
      preferences.categories.forEach((category: PreferenceCategory) => {
        category.preferences.forEach((preference: Preference) => {
          if (preference.id == id) {
            found = preference;
            throw new Error();
          }
        });
      });
    } catch (e) {
      return found;
    }
  }
}

export default PreferenceManager;

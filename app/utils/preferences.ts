import { ComponentType } from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { Timer, Extension } from '@material-ui/icons';

export interface Preferences {
  categories: Array<PreferenceCategory>;
}

export interface Preference {
  id: string;
  name: string;
  description: string;
  default: any;
}

export interface PreferenceCategory {
  id: string;
  icon: ComponentType<SvgIconProps>;
  name: string;
  preferences: Array<Preference>;
}

export default {
  categories: [
    {
      id: 'timer',
      icon: Timer,
      name: 'Timer',
      preferences: [
        {
          id: 'decimal-points',
          name: 'Decimal points',
          description: 'How many decimal points to show.',
          default: true,
        },
        {
          id: 'freeze-time',
          name: 'Freeze time',
          description: 'How many seconds to hold the spacebar.',
          default: false,
        },
        {
          id: 'hide-time-when-solving',
          name: 'Hide time when solving',
          description: 'Keep your time a surprise.',
          default: true,
        },
        {
          id: 'zero-out-time-after-solve',
          name: 'Zero out time after solve',
          description:
            'Instead of showing the time of your last solve, the timer will reset to 0.00 after a solve.',
          default: false,
        },
      ],
    },
    {
      id: 'scramble',
      icon: Extension,
      name: 'Scramble',
      preferences: [
        {
          id: 'scramble-test-setting',
          name: 'Scramble test setting',
          description: 'Switch it on or off nobody cares',
          default: false,
        },
      ],
    },
  ],
};

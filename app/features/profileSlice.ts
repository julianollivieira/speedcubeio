import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '@/types';

export interface ProfileSliceState {
  profile: Profile | null;
}

const initialState: ProfileSliceState = {
  profile: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserSliceState } from '@/features/userSlice';
import profileReducer, { ProfileSliceState } from '@/features/profileSlice';
import boxReducer, { BoxSliceState } from '@/features/boxSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    boxes: boxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState): UserSliceState['user'] => state.user.user;
export const selectProfile = (state: RootState): ProfileSliceState['profile'] =>
  state.profile.profile;
export const selectBoxes = (state: RootState): BoxSliceState['boxes'] =>
  state.boxes.boxes;

export default store;

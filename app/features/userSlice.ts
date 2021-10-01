import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import app from '@/utils/firebase/client';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth(app);

export interface UserSliceState {
  user: User | undefined | null;
}

const initialState: UserSliceState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>): void => {
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>): void => {
      signInWithEmailAndPassword(
        auth,
        action.payload.email,
        action.payload.password
      ).then((userCredential) => {
        state.user = userCredential.user.toJSON() as User;
      });
    },
    logout: (state): void => {
      signOut(auth).then(() => {
        state.user = null;
      });
    },
  },
});

export const { setUser, login, logout } = userSlice.actions;
export default userSlice.reducer;

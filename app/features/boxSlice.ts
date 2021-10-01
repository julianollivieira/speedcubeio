import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Box } from '@/types';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import app from '@/utils/firebase/client';

const db = getFirestore(app);

export interface BoxSliceState {
  boxes: Box[] | null;
}

const initialState: BoxSliceState = {
  boxes: null,
};

const createBox = createAsyncThunk(
  '',
  async (data: {
    user: User;
    box: Pick<Box, 'name' | 'icon' | 'color'>;
  }): Promise<Box> => {
    const documentReference = await addDoc(
      collection(db, 'users', data.user.uid, 'boxes'),
      {
        name: data.box.name,
        icon: data.box.icon,
        color: data.box.color,
      }
    );
    return {
      id: documentReference.id,
      name: data.box.name,
      icon: data.box.icon,
      color: data.box.color,
    } as Box;
  }
);

export const boxSlice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    setBoxes: (state, action: PayloadAction<Box[] | null>): void => {
      state.boxes = action.payload;
    },
    // createBox: (
    //   state,
    //   action: PayloadAction<{ user: User; box: Pick<Box, 'name' | 'icon' | 'color'> }>
    // ): void => {
    //   addDoc(collection(db, 'users', action.payload.user.uid, 'boxes'), {
    // name: action.payload.box.name,
    // icon: action.payload.box.icon,
    // color: action.payload.box.color,
    //     createdAt: serverTimestamp(),
    //   }).then((documentReference) => {
    //     getDoc(documentReference).then((documentSnapshot) => {
    //       state.boxes?.push(documentSnapshot.data() as Box);
    //     });
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(createBox.fulfilled, (state, action) => {
      state.boxes?.push(action.payload);
    });
  },
});

export { createBox };
export const { setBoxes } = boxSlice.actions;
export default boxSlice.reducer;

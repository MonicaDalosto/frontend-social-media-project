import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allSpaces: null,
  allStories: null
};

export const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setAllSpaces: (state, action) => {
      state.allSpaces = action.payload;
    }
  }
});

export const { setAllSpaces } = spaceSlice.actions;

export default spaceSlice.reducer;

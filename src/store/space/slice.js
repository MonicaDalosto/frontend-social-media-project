import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allSpaces: null,
  spaceDetails: null,
  allStories: null
};

export const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setAllSpaces: (state, action) => {
      state.allSpaces = action.payload;
    },
    setAllStories: (state, action) => {
      state.allStories = action.payload;
    }
  }
});

export const { setAllSpaces, setAllStories } = spaceSlice.actions;

export default spaceSlice.reducer;

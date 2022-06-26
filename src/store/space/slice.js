import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allSpaces: null,
  spaceDetails: null,
  mySpace: null,
  myFavorites: null,
  allStories: null
};

export const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setAllSpaces: (state, action) => {
      state.allSpaces = action.payload;
    },
    setSpaceDetails: (state, action) => {
      state.spaceDetails = action.payload;
    },
    setMySpace: (state, action) => {
      state.mySpace = action.payload;
    },
    setMyFavorites: (state, action) => {
      state.myFavorites = action.payload;
    },
    setAllStories: (state, action) => {
      state.allStories = action.payload;
    }
  }
});

export const {
  setAllSpaces,
  setSpaceDetails,
  setMySpace,
  setMyFavorites,
  setAllStories
} = spaceSlice.actions;

export default spaceSlice.reducer;

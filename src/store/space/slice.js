import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allSpaces: null,
  spaceDetails: null,
  mySpace: null,
  myFavorites: null,
  storyDetails: null,
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
    setStoryDetails: (state, action) => {
      state.storyDetails = action.payload;
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
  setStoryDetails,
  setAllStories
} = spaceSlice.actions;

export default spaceSlice.reducer;

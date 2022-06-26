export const selectAllSpaces = reduxState => reduxState.space.allSpaces;

export const selectSpecificSpaceDetails = reduxState =>
  reduxState.space.spaceDetails;

export const selectMySpace = reduxState => reduxState.space.mySpace;

export const selectMyFavorites = reduxState => reduxState.space.myFavorites;

export const selectAllStories = reduxState => reduxState.space.allStories;

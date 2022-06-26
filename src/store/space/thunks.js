import { showMessageWithTimeout } from '../appState/actions';
import axios from 'axios';
import {
  setAllSpaces,
  setSpaceDetails,
  setMySpace,
  setMyFavorites,
  setStoryDetails,
  setAllStories
} from './slice';

const API_URL = 'http://localhost:4000';

// Feature: 1 - The function to get all spaces from the Api:
export const getAllSpaces = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/spaces`);

    dispatch(setAllSpaces(response.data));
  } catch (error) {
    console.log('error from getAllSpaces thunk: ', error.message);
  }
};

// Feature 2 - The function to get the specific space with the stories from the Api, the spaceId is being past on the SpaceDetails page:
export const getSpecificSpace = spaceId => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/spaces/details/${spaceId}`);

    // *** Important: If you want to sort the stories inside the thunk, you need pay attention when add new stories, because the stories will be sorted before...
    // const storiesSorted = [...response.data.stories].sort(
    //   (a, b) => b.createdAt - a.createdAt
    // );
    // const updatedSpace = {
    //   ...response.data,
    //   stories: storiesSorted
    // };

    dispatch(setSpaceDetails(response.data));
  } catch (error) {
    console.log('error from getSpecificSpace thunk: ', error.message);
  }
};

export const getSpecificStory = storyId => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/stories/${storyId}`);

    dispatch(setStoryDetails(response.data));
  } catch (error) {
    console.log('error from getSpecificStory thunk: ', error.message);
  }
};

// The function to get all stories from the Api:
export const getAllStories = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/stories`);

    dispatch(setAllStories(response.data));
  } catch (error) {
    console.log('error from getAllSpaces thunk: ', error.message);
  }
};

// The function to get all stories from the Api:
export const deleteStory = (storyId, spaceId) => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    //  Send the request to the Api to delete the specific Story (ë possivel receber o retorno assim: "const deleteRequestResponse = await...", mas como não vou usar a response pra nada, não precisa)
    await axios.delete(`${API_URL}/stories/${storyId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // After the story being delete, update the MySpace
    const mySpaceResponse = await axios.get(
      `${API_URL}/spaces/details/${spaceId}`
    );
    dispatch(setMySpace(mySpaceResponse.data));
  } catch (error) {
    console.log('error from deleteStories thunk: ', error.message);
  }
};

export const postNewStory =
  (name, content, imageUrl, spaceId) => async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      await axios.post(
        `${API_URL}/stories`,
        {
          name,
          content,
          imageUrl,
          spaceId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // After the story being delete, update the MySpace
      const mySpaceResponse = await axios.get(
        `${API_URL}/spaces/details/${spaceId}`
      );
      dispatch(setMySpace(mySpaceResponse.data));
      dispatch(
        showMessageWithTimeout(
          'success',
          false,
          'Succesfull! Story created!',
          1500
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

// Dispatch from the MySpace, Edit mySpace
export const updateMySpace =
  (title, description, backgroundColor, color, spaceId) =>
  async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      await axios.put(
        `${API_URL}/spaces/${spaceId}`,
        {
          title,
          description,
          backgroundColor,
          color
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // After the space has been updated, update the MySpace
      const mySpaceResponse = await axios.get(
        `${API_URL}/spaces/details/${spaceId}`
      );
      dispatch(setMySpace(mySpaceResponse.data));
      dispatch(
        showMessageWithTimeout(
          'success',
          false,
          'Succesfull! Your space was updated!',
          1500
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

// Dispatch from SpaceDetails and mySpace (to add the story as favorite)
export const addNewFavoriteStory = storyId => async (dispatch, getState) => {
  try {
    const userId = getState().user.profile.id;
    const token = getState().user.token;
    await axios.post(
      `${API_URL}/favorites`,
      {
        userId,
        storyId
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log('response.data from thunk: ', response.data); // é um objeto

    const allMyFavoritesResponse = await axios.get(
      `${API_URL}/favorites/myfavorites/${userId}`
    );

    // console.log('All my favorites: ', allMyFavoritesResponse.data);
    dispatch(setMyFavorites(allMyFavoritesResponse.data));
    dispatch(
      showMessageWithTimeout(
        'success',
        false,
        "Succesfull! Story saved in your favorite's list!",
        1500
      )
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFavoriteStory = storyId => async (dispatch, getState) => {
  try {
    const userId = getState().user.profile.id;
    const token = getState().user.token;
    //  Send the request to the Api to delete the specific Favorite Story (é possivel receber o retorno assim: "const deleteRequestResponse = await...", mas como não vou usar a response pra nada, não precisa)
    console.log('token: ', token);
    await axios.delete(`${API_URL}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userId,
        storyId
      }
    });

    const allMyFavoritesResponse = await axios.get(
      `${API_URL}/favorites/myfavorites/${userId}`
    );

    console.log('All my favorites: ', allMyFavoritesResponse.data);
    dispatch(setMyFavorites(allMyFavoritesResponse.data));
    dispatch(
      showMessageWithTimeout(
        'success',
        false,
        "Succesfull! Story saved in your favorite's list!",
        1500
      )
    );

    // After the favorite story has been deleted, update MyFavorites
  } catch (error) {
    console.log('error from deleteFavoriteStory thunk: ', error.message);
  }
};

export const postNewBid = (value, storyId) => async (dispatch, getState) => {
  try {
    const userId = getState().user.profile.id;
    const token = getState().user.token;
    await axios.post(
      `${API_URL}/bids`,
      {
        value,
        storyId,
        userId
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // After the story being delete, update the MySpace
    dispatch(getSpecificStory(storyId));
    dispatch(
      showMessageWithTimeout(
        'success',
        false,
        'Succesfull! Story created!',
        1500
      )
    );
  } catch (error) {
    console.log(error.message);
  }
};

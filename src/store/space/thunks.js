import { showMessageWithTimeout } from '../appState/actions';
import axios from 'axios';
import {
  setAllSpaces,
  setSpaceDetails,
  setMySpace,
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
export const deleteStory =
  (storyId, spaceId, token) => async (dispatch, getState) => {
    try {
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
  (name, content, imageUrl, spaceId, token) => async (dispatch, getState) => {
    try {
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
  (title, description, backgroundColor, color, spaceId, token) =>
  async (dispatch, getState) => {
    try {
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
export const addNewFavoriteStory =
  (userId, storyId, token) => async (dispatch, getState) => {
    try {
      const response = await axios.post(
        `${API_URL}/favorites`,
        {
          userId,
          storyId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('response.data from thunk: ', response.data); // é um objeto

      // const allFavoritesResponse = await axios.get(`${API_URL}/favorites`);
      // dispatch(setMySpace(mySpaceResponse.data));
      // dispatch(
      //   showMessageWithTimeout(
      //     'success',
      //     false,
      //     'Succesfull! Favorite added!',
      //     1500
      //   )
      // );
    } catch (error) {
      console.log(error.message);
    }
  };

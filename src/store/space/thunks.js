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
      //  Send the request to the Api to delete the specific Story
      const deleteRequest = await axios.delete(
        `${API_URL}/stories/${storyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

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

import axios from 'axios';
import { setAllSpaces, setSpaceDetails, setAllStories } from './slice';

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
    console.log('specificSpace: ', response.data);

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
export const deleteStory = id => async (dispatch, getState) => {
  try {
    const response = await axios.delete(`${API_URL}/stories/${id}`);
    console.log('response from delete thunk: ', response);
  } catch (error) {
    console.log('error from deleteStories thunk: ', error.message);
  }
};

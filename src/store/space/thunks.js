import axios from 'axios';
import { setAllSpaces, setAllStories } from './slice';

const API_URL = 'http://localhost:4000';

// Feature: 1 - The function to get all spaces from the Api:
export const getAllSpaces = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/spaces`);
    // console.log(response.data);

    dispatch(setAllSpaces(response.data));
  } catch (error) {
    console.log('error from getAllSpaces thunk: ', error.message);
  }
};

// Feature 2 - The function to get the specific space with the stories from the Api:
export const getSpecificSpace = spaceId => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/spaces/details/${spaceId}`);
    console.log('Data from getSpecificSpace thunk: ', response.data);

    // dispatch(setAllSpaces(response.data));
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

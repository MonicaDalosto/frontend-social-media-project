import axios from 'axios';
import { setAllSpaces, setAllStories } from './slice';

const API_URL = 'http://localhost:4000';

// The function to get all spaces from the Api:
export const getAllSpaces = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/spaces`);
    // console.log(response.data);

    dispatch(setAllSpaces(response.data));
  } catch (error) {
    console.log('error from getAllSpaces thunk: ', error.message);
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

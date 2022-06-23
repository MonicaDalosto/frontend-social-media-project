import { apiUrl } from '../../config/constants';
import axios from 'axios';
import { selectToken } from './selectors';
import { appLoading, appDoneLoading, setMessage } from '../appState/slice';
import { showMessageWithTimeout } from '../appState/actions';
import { loginSuccess, logOut, tokenStillValid } from './slice';
import { setMySpace } from '../space/slice';

export const signUp = (name, email, password, navigate) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout('success', true, 'account created'));
      dispatch(appDoneLoading());

      // Feature 3: Post the request to create the new space, and navigate the user to his space:
      const { id } = response.data.user;

      const newSpaceResponse = await axios.post(`${apiUrl}/spaces`, {
        name,
        id
      });

      console.log('newSpaceResponse: ', newSpaceResponse);

      dispatch(setMySpace(newSpaceResponse.data));
      navigate(`/myspace/${id}`);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: 'danger',
            dismissable: true,
            text: error.response.data.message
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: 'danger',
            dismissable: true,
            text: error.message
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      //  When the user login, send the mySpace value to the reducer slice to set on the state:
      // console.log('response.data.user login: ', response.data.user);
      dispatch(setMySpace(response.data.user.mySpace));
      dispatch(showMessageWithTimeout('success', false, 'welcome back!', 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: 'danger',
            dismissable: true,
            text: error.response.data.message
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: 'danger',
            dismissable: true,
            text: error.response.data.message
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // console.log('user data from inside the me thunks: ', response.data);
      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(setMySpace(response.data.mySpace));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

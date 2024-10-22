import axios from 'axios';
import baseUrl from '../../backend/baseUrl';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginUser = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const response = await axios.post(`${baseUrl}login`, { email, password });
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.error || error.message });
        }
    };
};

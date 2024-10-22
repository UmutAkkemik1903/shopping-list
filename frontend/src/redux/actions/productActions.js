import axios from 'axios';
import baseUrl from '../../backend/baseUrl';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const productData = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${baseUrl}products`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
        }
    };
};

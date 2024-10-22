import axios from 'axios';
import baseUrl from '../../backend/baseUrl';

export const FETCH_LISTS_REQUEST = 'FETCH_LISTS_REQUEST';
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_FAILURE = 'FETCH_LISTS_FAILURE';

export const CREATE_LIST_REQUEST = 'CREATE_LIST_REQUEST';
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'CREATE_LIST_FAILURE';

export const UPDATE_QUANTITY_REQUEST = 'UPDATE_QUANTITY_REQUEST';
export const UPDATE_QUANTITY_SUCCESS = 'UPDATE_QUANTITY_SUCCESS';
export const UPDATE_QUANTITY_FAILURE = 'UPDATE_QUANTITY_FAILURE';

export const UPDATE_STATUS_APPROVED_FAILURE = 'UPDATE_STATUS_APPROVED_FAILURE';
export const UPDATE_STATUS_APPROVED_REQUEST = 'UPDATE_STATUS_APPROVED_REQUEST';
export const UPDATE_STATUS_APPROVED_SUCCESS = 'UPDATE_STATUS_APPROVED_SUCCESS';

export const UPDATE_STATUS_DESTROY_REQUEST = 'UPDATE_STATUS_DESTROY_REQUEST';
export const UPDATE_STATUS_DESTROY_SUCCESS = 'UPDATE_STATUS_DESTROY_SUCCESS';
export const UPDATE_STATUS_DESTROY_FAILURE = 'UPDATE_STATUS_DESTROY_FAILURE';

export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';

export const fetchTableData = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_LISTS_REQUEST });
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${baseUrl}list-products`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            dispatch({ type: FETCH_LISTS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_LISTS_FAILURE, payload: error.message });
        }
    };
};

export const createShoppingList = (listData) => {
    return async (dispatch) => {
      dispatch({ type: 'CREATE_LIST_REQUEST' });
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${baseUrl}list-product-create`, listData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: 'CREATE_LIST_SUCCESS', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'CREATE_LIST_FAILURE', payload: error.message });
        throw error;
      }
    };
  };

  export const updateQuantity = (id,quantity) => {
    return async (dispatch) => {
      dispatch({ type: 'UPDATE_QUANTITY_REQUEST' });
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${baseUrl}list-quantity-update/${id}`, {quantity}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: 'UPDATE_QUANTITY_SUCCESS', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'UPDATE_QUANTITY_FAILURE', payload: error.message });
        throw error;
      }
    };
  };

  export const updateStatusApproved = (id,status) => {
    return async (dispatch) => {
      dispatch({ type: 'UPDATE_STATUS_APPROVED_REQUEST' });
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${baseUrl}list-status-approved/${id}`, {status}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: 'UPDATE_STATUS_APPROVED_SUCCESS', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'UPDATE_STATUS_APPROVED_FAILURE', payload: error.message });
        throw error;
      }
    };
  };

  export const updateStatusDestroy = (id) => {
    return async (dispatch) => {
      dispatch({ type: 'UPDATE_STATUS_DESTROY_REQUEST' });
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${baseUrl}list-status-destoy/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: 'UPDATE_STATUS_DESTROY_SUCCESS', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'UPDATE_STATUS_DESTROY_FAILURE', payload: error.message });
        throw error;
      }
    };
  };

  export const deleteProductList = (id) => {
    return async (dispatch) => {
      dispatch({ type: 'DELETE_REQUEST' });
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}list-product-delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: 'DELETE_SUCCESS', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'DELETE_FAILURE', payload: error.message });
        throw error;
      }
    };
  };

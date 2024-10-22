import axios from 'axios';
import baseUrl from '../../backend/baseUrl';

export const FETCH_LISTS_REQUEST = 'FETCH_LISTS_REQUEST';
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_FAILURE = 'FETCH_LISTS_FAILURE';

export const FETCH_ARCHIVE_LISTS_REQUEST = 'FETCH_ARCHIVE_LISTS_REQUEST';
export const FETCH_ARCHIVE_LISTS_SUCCESS = 'FETCH_ARCHIVE_LISTS_SUCCESS';
export const FETCH_ARCHIVE_LISTS_FAILURE = 'FETCH_ARCHIVE_LISTS_FAILURE';

export const CREATE_LIST_REQUEST = 'CREATE_LIST_REQUEST';
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'CREATE_LIST_FAILURE';

export const UPDATE_LIST_REQUEST = 'UPDATE_LIST_REQUEST';
export const UPDATE_LIST_SUCCESS = 'UPDATE_LIST_SUCCESS';
export const UPDATE_LIST_FAILURE = 'UPDATE_LIST_FAILURE';

export const ARCHIVED_REQUEST = 'ARCHIVED_REQUEST';
export const ARCHIVED_SUCCESS = 'ARCHIVED_SUCCESS';
export const ARCHIVED_FAILURE = 'ARCHIVED_FAILURE';

export const DELETE_LIST_REQUEST = 'DELETE_LIST_REQUEST';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE = 'DELETE_LIST_FAILURE';

export const fetchTableData = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_LISTS_REQUEST });
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${baseUrl}list`, {
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

export const fetchArchiveData = () => {
  return async (dispatch) => {
      dispatch({ type: FETCH_ARCHIVE_LISTS_REQUEST });
      const token = localStorage.getItem('token');
      try {
          const response = await axios.get(`${baseUrl}archive-list`, {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
          dispatch({ type: FETCH_ARCHIVE_LISTS_SUCCESS, payload: response.data });
      } catch (error) {
          dispatch({ type: FETCH_ARCHIVE_LISTS_FAILURE, payload: error.message });
      }
  };
};

export const createList = (listData) => {
    return async (dispatch) => {
      dispatch({ type: 'CREATE_LIST_REQUEST' });
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${baseUrl}list`, listData, {
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

  export const updateList = (id,listUpdateData) => {
    return async (dispatch) => {
      dispatch({ type: 'UPDATE_LIST_REQUEST' });
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${baseUrl}list-edit/${id}`, listUpdateData ,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: 'UPDATE_LIST_SUCCESS', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'UPDATE_LIST_FAILURE', payload: error.message });
        throw error;
      }
    };
  };
  
  export const archived = (id) => {
    return async (dispatch) => {
      dispatch({ type: 'ARCHIVED_REQUEST' });
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}list-archive/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: 'ARCHIVED_SUCCESS', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'ARCHIVED_FAILURE', payload: error.message });
        throw error;
      }
    };
  };

  export const deleteList = (id) => {
    return async (dispatch) => {
      dispatch({ type: 'DELETE_LIST_REQUEST' });
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}list-delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: 'DELETE_LIST_SUCCESS', payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: 'DELETE_LIST_FAILURE', payload: error.message });
        throw error;
      }
    };
  };

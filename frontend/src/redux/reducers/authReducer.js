import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

const initialState = {
    loading: false,
    token: null,
    error: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: '' };
        case LOGIN_SUCCESS:
            return { loading: false, token: action.payload.token, error: '' };
        case LOGIN_FAILURE:
            return { loading: false, token: null, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;

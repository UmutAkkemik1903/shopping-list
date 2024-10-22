import { 
    FETCH_LISTS_REQUEST,
    FETCH_LISTS_SUCCESS,
    FETCH_LISTS_FAILURE,
    CREATE_LIST_REQUEST,
    CREATE_LIST_SUCCESS,
    CREATE_LIST_FAILURE,
    UPDATE_LIST_REQUEST,
    UPDATE_LIST_SUCCESS,
    UPDATE_LIST_FAILURE,
    ARCHIVED_REQUEST,
    ARCHIVED_SUCCESS,
    ARCHIVED_FAILURE,
    FETCH_ARCHIVE_LISTS_REQUEST,
    FETCH_ARCHIVE_LISTS_SUCCESS,
    FETCH_ARCHIVE_LISTS_FAILURE,
    DELETE_LIST_REQUEST,
    DELETE_LIST_SUCCESS,
    DELETE_LIST_FAILURE

} from '../actions/listActions';

const initialState = {
    loading: false,
    lists: [],
    error: '',
};

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LISTS_REQUEST:
            return { ...state, loading: true, error: '' };
        case FETCH_LISTS_SUCCESS:
            return { loading: false, lists: action.payload, error: '' };
        case FETCH_LISTS_FAILURE:
            return { loading: false, lists: [], error: action.payload };
        
        case FETCH_ARCHIVE_LISTS_REQUEST:
            return { ...state, loading: true, error: '' };
        case FETCH_ARCHIVE_LISTS_SUCCESS:
            return { loading: false, lists: action.payload, error: '' };
        case FETCH_ARCHIVE_LISTS_FAILURE:
            return { loading: false, lists: [], error: action.payload };

        case CREATE_LIST_REQUEST:
            return { ...state, loading: true, error: '' };
        case CREATE_LIST_SUCCESS:
            return { loading: false, lists: [...state.lists, action.payload], error: '' };
        case CREATE_LIST_FAILURE:
            return { loading: false, error: action.payload };

        case UPDATE_LIST_REQUEST:
            return { ...state, loading: true, error: '' };
        case UPDATE_LIST_SUCCESS:
            return { loading: false, lists: [...state.lists, action.payload], error: '' };
        case UPDATE_LIST_FAILURE:
            return { loading: false, error: action.payload };

        case ARCHIVED_REQUEST:
            return { ...state, loading: true, error: '' };
        case ARCHIVED_SUCCESS:
            return { loading: false, lists: [...state.lists, action.payload], error: '' };
        case ARCHIVED_FAILURE:
            return { loading: false, error: action.payload };
            
        case DELETE_LIST_REQUEST:
            return { ...state, loading: true, error: '' };
        case DELETE_LIST_SUCCESS:
            return { loading: false, lists: [...state.lists, action.payload], error: '' };
        case DELETE_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export default listsReducer;

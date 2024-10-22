import { 
    FETCH_LISTS_REQUEST, FETCH_LISTS_SUCCESS, FETCH_LISTS_FAILURE, 
    CREATE_LIST_REQUEST,CREATE_LIST_SUCCESS,CREATE_LIST_FAILURE,
    UPDATE_QUANTITY_REQUEST,UPDATE_QUANTITY_SUCCESS,UPDATE_QUANTITY_FAILURE,
    UPDATE_STATUS_APPROVED_FAILURE,UPDATE_STATUS_APPROVED_REQUEST,UPDATE_STATUS_APPROVED_SUCCESS,
    UPDATE_STATUS_DESTROY_FAILURE,UPDATE_STATUS_DESTROY_REQUEST,UPDATE_STATUS_DESTROY_SUCCESS,
    DELETE_REQUEST,DELETE_SUCCESS,DELETE_FAILURE

} from '../actions/shoppingListActions';

const initialState = {
    loading: false,
    shoppingList: [],
    error: '',
};

const shoppingListsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LISTS_REQUEST:
            return { ...state, loading: true, error: '' };
        case FETCH_LISTS_SUCCESS:
            return { loading: false, shoppingList: action.payload, error: '' };
        case FETCH_LISTS_FAILURE:
            return { loading: false, shoppingList: [], error: action.payload };

        case CREATE_LIST_REQUEST:
            return { ...state, loading: true, error: '' };
        case CREATE_LIST_SUCCESS:
            return { loading: false, shoppingList: [...state.shoppingList, action.payload], error: '' };
        case CREATE_LIST_FAILURE:
            return { loading: false, error: action.payload };

        case UPDATE_QUANTITY_REQUEST:
            return { ...state, loading: true, error: '' };
        case UPDATE_QUANTITY_SUCCESS:
            return { loading: false, shoppingList: [...state.shoppingList, action.payload], error: '' };
        case UPDATE_QUANTITY_FAILURE:
            return { loading: false, error: action.payload };

        case UPDATE_STATUS_APPROVED_REQUEST:
            return { ...state, loading: true, error: '' };
        case UPDATE_STATUS_APPROVED_SUCCESS:
            return { loading: false, shoppingList: [...state.shoppingList, action.payload], error: '' };
        case UPDATE_STATUS_APPROVED_FAILURE:
            return { loading: false, error: action.payload };

        case UPDATE_STATUS_DESTROY_REQUEST:
            return { ...state, loading: true, error: '' };
        case UPDATE_STATUS_DESTROY_SUCCESS:
            return { loading: false, shoppingList: [...state.shoppingList, action.payload], error: '' };
        case UPDATE_STATUS_DESTROY_FAILURE:
            return { loading: false, error: action.payload };

        case DELETE_REQUEST:
            return { ...state, loading: true, error: '' };
        case DELETE_SUCCESS:
            return { loading: false, shoppingList: [...state.shoppingList, action.payload], error: '' };
        case DELETE_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export default shoppingListsReducer;

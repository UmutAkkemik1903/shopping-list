import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import listsReducer from '../reducers/listReducer';
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    lists: listsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

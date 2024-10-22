import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import listsReducer from '../reducers/listReducer';
import shoppingListsReducer from '../reducers/shoppingListReducer';
import authReducer from '../reducers/authReducer';
import productReducer from '../reducers/productReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    lists: listsReducer,
    products: productReducer,
    shoppingList: shoppingListsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

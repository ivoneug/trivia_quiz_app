import { combineReducers } from 'redux';
import CategoryListReducer from './CategoryListReducer';

export default combineReducers({
    categories: CategoryListReducer
});

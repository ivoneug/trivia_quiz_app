import { combineReducers } from 'redux';
import CategoryListReducer from './CategoryListReducer';
import DifficultyReducer from './DifficultyReducer';

export default combineReducers({
    categories: CategoryListReducer,
    difficulty: DifficultyReducer
});

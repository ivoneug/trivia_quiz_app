import { combineReducers } from 'redux';
import CategoryListReducer from './CategoryListReducer';
import DifficultyReducer from './DifficultyReducer';
import TokenReducer from './TokenReducer';

export default combineReducers({
    token: TokenReducer,
    categories: CategoryListReducer,
    difficulty: DifficultyReducer
});

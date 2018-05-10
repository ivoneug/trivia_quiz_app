import { combineReducers } from 'redux';
import CategoryListReducer from './CategoryListReducer';
import DifficultyReducer from './DifficultyReducer';
import TokenReducer from './TokenReducer';
import QuizReducer from './QuizReducer';

export default combineReducers({
    token: TokenReducer,
    categories: CategoryListReducer,
    difficulty: DifficultyReducer,
    quiz: QuizReducer
});

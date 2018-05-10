import {
    CLEAR_QUIZ
} from './types';

export const clearQuiz = () => {
    return {
        type: CLEAR_QUIZ,
        payload: null
    };
};

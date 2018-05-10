import {
    ANSWER_QUESTION_ACTION
} from './types';

export const answerQuestion = (index, correct) => {
    return {
        type: ANSWER_QUESTION_ACTION,
        payload: {
            index,
            correct
        }
    };
};

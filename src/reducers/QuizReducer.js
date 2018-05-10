import {
    GET_QUIZ_SUCCESS,
    GET_QUIZ_FAILED,
    ANSWER_QUESTION_ACTION,
    CLEAR_QUIZ
} from '../actions/types';

const decode = require('ent/decode');

const INITIAL_STATE = {
    items: [],
    index: 0,
    total: 0,
    answers: [],
    correctCount: 0,
    incorrectCount: 0,
    failed: false,
    loaded: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_QUIZ_SUCCESS:
        {
            const items = mapQuestions(action.payload);
            const answers = [];
            answers.length = items.length;

            return {
                ...state,
                items,
                index: 0,
                total: items.length,
                answers,
                failed: false,
                loaded: true
            };
        }

        case GET_QUIZ_FAILED:
            return {
                ...state,
                failed: true,
                loaded: false
            };

        case ANSWER_QUESTION_ACTION:
        {
            const index = action.payload.index;
            const answers = state.answers;
            answers[index] = action.payload.correct;

            const correctCount = answers.reduce((prevVal, val) => {
                return val === true ? prevVal + 1 : prevVal;
            }, 0);
            const incorrectCount = answers.reduce((prevVal, val) => {
                return val === false ? prevVal + 1 : prevVal;
            }, 0);

            return {
                ...state,
                index: index + 1,
                answers,
                correctCount,
                incorrectCount
            };
        }

        case CLEAR_QUIZ:
            return INITIAL_STATE;

        default:
            return state;
    }
};

const mapQuestions = (items) => {
    return items.map((item) => {
        const answers = [{
            text: decode(item.correct_answer),
            correct: true
        }].concat(item.incorrect_answers.map((text) => {
            return {
                text: decode(text),
                correct: false
            };
        }));

        const result = {
            text: decode(item.question),
            answers: shuffle(answers)
        };

        return result;
    });
};

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

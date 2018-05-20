import axios from 'axios';
import 'babel-polyfill';
import {
    GET_QUIZ_SUCCESS,
    GET_QUIZ_FAILED,
    CLEAR_TOKEN
} from './types';

export const getQuiz = (categoryId, difficulty, token) => {
    return (dispatch) => {
        // construct URL
        const getUrl = (difficulty, token) => {
            let url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`;

            if (difficulty != null) {
                const difficultyValue = [
                    'easy',
                    'medium',
                    'hard',
                    'any'][difficulty];
                if (difficultyValue !== 'any') {
                    url += `&difficulty=${difficultyValue}`;
                }
            }

            if (token) {
                url += `&token=${token}`;
            }

            return url;
        };

        const request = (requestUrl) => {
            axios.get(requestUrl)
                .then((response) => {
                    if (response && response.data) {
                        // when we got 'response_code' with values 3 or 4
                        // it means that we're out of questions for this token
                        // so drop the token & make a new request without it
                        const code = response.data.response_code;
                        const results = response.data.results;
                        if (code === 3 || code === 4) {
                            // clear token (it will be requested next time
                            // user visit main screen)
                            dispatch({
                                type: CLEAR_TOKEN,
                                payload: null
                            });

                            // clear token inplace
                            token = null;
                            request(getUrl(difficulty));
                            return;
                        } else if (results.length === 0) {
                            // when there is no results for selected difficulty
                            // make a new request without difficulty
                            request(getUrl(null, token));
                            return;
                        }

                        success(dispatch, results);
                    } else {
                        failed(dispatch);
                    }
                }).catch(() => { failed(dispatch); });
        };
        request(getUrl(difficulty, token));
    };
};

const success = (dispatch, data) => {
    dispatch({
        type: GET_QUIZ_SUCCESS,
        payload: data
    });
};

const failed = (dispatch) => {
    dispatch({
        type: GET_QUIZ_FAILED,
        payload: null
    });
};

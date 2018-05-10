import axios from 'axios';
import {
    GET_QUIZ_SUCCESS,
    GET_QUIZ_FAILED,
    CLEAR_TOKEN
} from './types';

export const getQuiz = (categoryId, difficulty, token) => {
    return (dispatch) => {
        let url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`;

        const difficultyValue = [
            'easy',
            'medium',
            'hard',
            'any'][difficulty];
        url += `&difficulty=${difficultyValue}`;

        let urlWithToken = url;
        if (token) {
            urlWithToken += `&token=${token}`;
        }

        const request = (requestUrl) => {
            axios.get(requestUrl)
                .then((response) => {
                    if (response && response.data) {
                        // when we got 'response_code' with values 3 or 4
                        // it means that we're out of questions for this token
                        // so drop the token & make a new request without it
                        const code = response.data.response_code;
                        if (code === 3 || code === 4) {
                            // clear token (it will be requested next time
                            // user visit main screen)
                            dispatch({
                                type: CLEAR_TOKEN,
                                payload: null
                            });

                            request(url);
                            return;
                        }

                        success(dispatch, response.data.results);
                    } else {
                        failed(dispatch);
                    }
                }).catch(() => { failed(dispatch); });
        };
        request(urlWithToken);
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

import axios from 'axios';
import {
    REQUEST_TOKEN_SUCCESS,
    REQUEST_TOKEN_FAILED
} from './types';

export const requestToken = () => {
    return (dispatch) => {
        axios.get('https://opentdb.com/api_token.php?command=request')
            .then((response) => {
                if (response && response.data && response.data.token) {
                    success(dispatch, response.data.token);
                } else {
                    failed(dispatch);
                }
            }).catch(() => {
                failed(dispatch);
            });
    };
};

const success = (dispatch, token) => {
    dispatch({
        type: REQUEST_TOKEN_SUCCESS,
        payload: token
    });
};

const failed = (dispatch) => {
    dispatch({
        type: REQUEST_TOKEN_FAILED,
        payload: null
    });
};

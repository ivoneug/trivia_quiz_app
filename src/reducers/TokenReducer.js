import {
    REQUEST_TOKEN_SUCCESS,
    REQUEST_TOKEN_FAILED
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_TOKEN_SUCCESS:
            return action.payload;

        case REQUEST_TOKEN_FAILED:
        default:
            return state;
    }
};

import {
    REQUEST_TOKEN_SUCCESS,
    REQUEST_TOKEN_FAILED,
    CLEAR_TOKEN
} from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_TOKEN_SUCCESS:
            return action.payload;

        case CLEAR_TOKEN:
            return INITIAL_STATE;

        case REQUEST_TOKEN_FAILED:
        default:
            return state;
    }
};

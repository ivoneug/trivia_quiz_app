import {
    CATEGORY_LIST_FETCH_SUCCESS,
    CATEGORY_LIST_FETCH_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    list: [],
    failed: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORY_LIST_FETCH_SUCCESS:
            return {
                list: action.payload,
                failed: false
            };

        case CATEGORY_LIST_FETCH_FAILED:
            return {
                list: [],
                failed: true
            };

        default:
            return state;
    }
};

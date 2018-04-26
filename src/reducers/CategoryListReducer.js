import {
    CATEGORY_LIST_FETCH_SUCCESS,
    CATEGORY_LIST_FETCH_FAILED,
    CATEGORY_SELECT
} from '../actions/types';

const INITIAL_STATE = {
    selectedCategory: {
        id: 0,
        name: ''
    },
    list: [],
    failed: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORY_LIST_FETCH_SUCCESS:
            return {
                ...state,
                list: action.payload,
                failed: false
            };

        case CATEGORY_LIST_FETCH_FAILED:
            return {
                ...state,
                list: [],
                failed: true
            };

        case CATEGORY_SELECT:
            return {
                ...state,
                selectedCategory: action.payload
            };

        default:
            return state;
    }
};

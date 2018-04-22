import { DIFFICULTY_SELECTED } from '../actions/types';

const INITIAL_STATE = 1;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DIFFICULTY_SELECTED:
            return action.payload;

        default:
            return state;
    }
};

import { DIFFICULTY_SELECTED } from './types'

export const difficultySelect = (difficulty) => {
    return {
        type: DIFFICULTY_SELECTED,
        payload: difficulty
    };
};

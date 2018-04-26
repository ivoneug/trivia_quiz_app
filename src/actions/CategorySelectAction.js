import { CATEGORY_SELECT } from './types';

export const categorySelect = (category) => {
    return {
        type: CATEGORY_SELECT,
        payload: category
    };
};

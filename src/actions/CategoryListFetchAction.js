import axios from 'axios';
import {
    CATEGORY_LIST_FETCH_SUCCESS,
    CATEGORY_LIST_FETCH_FAILED
} from './types';

export const categoryListFetch = () => {
    return (dispatch) => {
        axios.get('https://opentdb.com/api_category.php')
            .then((response) => {
                if (response && response.data) {
                    success(dispatch, response.data);
                } else {
                    failed(dispatch);
                }
            }).catch(() => {
                failed(dispatch);
            });
    };
};

const success = (dispatch, data) => {
    const items = data.trivia_categories.map((item) => {
        const idx = item.name.indexOf(':');
        let name = item.name;

        if (idx !== -1) {
            name = name.split(':')[1].trim();
        }

        return {
            id: item.id,
            name
        };
    });

    items.unshift({
        id: -1,
        name: 'Random Category'
    });

    dispatch({
        type: CATEGORY_LIST_FETCH_SUCCESS,
        payload: items
    });
};

const failed = (dispatch) => {
    dispatch({
        type: CATEGORY_LIST_FETCH_FAILED,
        payload: null
    });
};

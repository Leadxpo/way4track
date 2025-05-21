// actionStaff.js
import api from '../../Api/api';  // Assuming api.js is in the same directory
import {
    DRAW_LABEL_REQUEST,
    DRAW_LABEL_SUCCESS,
    DRAW_LABEL_FAIL,
} from '../Constants/drawConstant';

// Login action
export const drawLabel = (label) => async (dispatch) => {
    dispatch({ type: DRAW_LABEL_REQUEST });
    if (label) {
        dispatch({
            type: DRAW_LABEL_SUCCESS,
            payload: label
        });
    } else {
        dispatch({
            type: DRAW_LABEL_FAIL,
            payload: null
        });
    }
};

// reducerStaff.js
import {
    DRAW_LABEL_REQUEST,
    DRAW_LABEL_SUCCESS,
    DRAW_LABEL_FAIL,
  } from '../Constants/drawConstant';
  
  const initialState = {
    loading: false,
    selectedLabel: "",
    error: null,
  };
  
  export const drawReducer = (state = initialState, action) => {
    switch (action.type) {
      case DRAW_LABEL_REQUEST:
        return { ...state, loading: true };
      case DRAW_LABEL_SUCCESS:
        return { loading: false, selectedLabel: action.payload, error: null };
      case DRAW_LABEL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default drawReducer;  // Export default (if needed)
  
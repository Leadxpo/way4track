// reducerStaff.js
import {
    STAFF_LOGIN_REQUEST,
    STAFF_LOGIN_SUCCESS,
    STAFF_LOGIN_FAIL,
  } from '../Constants/loginConstant';
  
  const initialState = {
    loading: false,
    staffInfo: null,
    error: null,
  };
  
  export const staffLoginReducer = (state = initialState, action) => {
    switch (action.type) {
      case STAFF_LOGIN_REQUEST:
        return { ...state, loading: true };
      case STAFF_LOGIN_SUCCESS:
        return { loading: false, staffInfo: action.payload, error: null };
      case STAFF_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default staffLoginReducer;  // Export default (if needed)
  
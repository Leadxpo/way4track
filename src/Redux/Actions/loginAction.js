// actionStaff.js
import { Alert } from 'react-native';
import api from '../../Api/api';  // Assuming api.js is in the same directory
import {
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
} from '../Constants/loginConstant';

// Login action
export const login = (login_payload) => async (dispatch) => {
  const { designation, staffId, password, unitCode, companyCode } = login_payload;
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    dispatch({ type: STAFF_LOGIN_REQUEST });
  
    const {data}  = await api.post('/login/LoginDetails', login_payload, {
      headers: { "Content-Type": "application/json" }
    });
console.log("rrr :",data)
    if (data.status) {
      dispatch({
        type: STAFF_LOGIN_SUCCESS,
        payload: data.data.data,
      });
    } else {
      // Alert.alert(data.message)
      throw new Error(data.internalMessage || "Login failed.");
    }
  } catch (error) {
    console.log("error : ", error);
    dispatch({
      type: STAFF_LOGIN_FAIL,
      payload: error.response && error.response.data.internalMessage
        ? error.response.data.internalMessage
        : error.message,
    });
  }
};
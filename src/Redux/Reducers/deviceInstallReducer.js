import { CREATE_DEVICE_INSTALL_REQUEST, CREATE_DEVICE_INSTALL_SUCCESS, CREATE_DEVICE_INSTALL_FAILURE, DELETE_DEVICE_INSTALL_REQUEST, UPDATE_DEVICE_INSTALL_REQUEST } from "../Constants/deviceInstallConstant";
import * as actionType from "../Constants/deviceInstallConstant";

const initialState = {
  deviceInstallData: null,
  loading: false,
  error: null,
};

export const uploadDeviceInstallReducer = (state = { loading: false, uploadDeviceInstallInfo: {}, error: "" }, action) => {
  switch (action.type) {
      case actionType.UPLOAD_DEVICE_INSTALL_REQUEST:
          return { 
              ...state,
              loading: true,
          }
      case actionType.UPLOAD_DEVICE_INSTALL_SUCCESS:
          if (state.uploadDeviceInstallInfo === action.payload) {
              return state;  // No state change if the array is the same
            }
          return {
              ...state,
              loading: false,
              uploadDeviceInstallInfo: action.payload
          }
      case actionType.UPLOAD_DEVICE_INSTALL_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload
          }
      default: return state
  }
}

export const deviceInstallReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DEVICE_INSTALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_DEVICE_INSTALL_SUCCESS:
      return {
        ...state,
        loading: false,
        deviceInstallData: action.payload,
      };
    case CREATE_DEVICE_INSTALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_DEVICE_INSTALL_REQUEST:
      return {
        ...state,
        deviceInstallData: {
          ...state.deviceInstallData,  // Spread the existing deviceInstallData
          ...action.payload,   // Merge with the updated data
        },
      };
    case DELETE_DEVICE_INSTALL_REQUEST:
      return {
        ...state,
        deviceInstallData: null, // Clear the deviceInstall data
      };

    default:
      return state;
  }
};

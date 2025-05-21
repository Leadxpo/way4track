import {
  CREATE_DEVICE_INSTALL_SUCCESS,
  CREATE_DEVICE_INSTALL_REQUEST,
  CREATE_DEVICE_INSTALL_FAILURE,
  UPLOAD_DEVICE_INSTALL_SUCCESS,
  UPLOAD_DEVICE_INSTALL_REQUEST,
  UPLOAD_DEVICE_INSTALL_FAILURE,
  UPDATE_DEVICE_INSTALL_REQUEST,
  DELETE_DEVICE_INSTALL_REQUEST,
} from "../Constants/deviceInstallConstant";
import * as actionType from "../Constants/deviceInstallConstant";
import api from "../../Api/api";

export const uploadDeviceInstall = (create_DevicePayload) => async (dispatch) => {
  const { id, staffId, screenShot, service,name, productIMEI, productSIM, vehicleType, vehicleNumber, chassisNumber, engineNumber, vehiclePhotoUpload_one, vehiclePhotoUpload_two, vehiclePhotoUpload_three, vehiclePhotoUpload_four, date, productName, phoneNumber, workStatus,paymentStatus, address } = create_DevicePayload;

  const createWorkFormData = new FormData();
  if (id) {
    createWorkFormData.append("id", id);
  }
  if (productIMEI) {
    createWorkFormData.append("imeiNumbe", productIMEI);
  }  
  if (productSIM) {
    createWorkFormData.append("simNumber", productSIM);
  }
  if (screenShot) {
    createWorkFormData.append("screenShot",screenShot);
  }
  createWorkFormData.append("service", service);
  createWorkFormData.append("staffId", staffId);
  // createWorkFormData.append("workId", workId);
  createWorkFormData.append("vehicleType", vehicleType);
  createWorkFormData.append("vehicleNumber", vehicleNumber);
  createWorkFormData.append("chassisNumber", chassisNumber);
  createWorkFormData.append("engineNumber", engineNumber);
  if (vehiclePhotoUpload_one) {
    createWorkFormData.append("photo1", vehiclePhotoUpload_one)
  }
  if (vehiclePhotoUpload_two) {
    createWorkFormData.append("photo2", vehiclePhotoUpload_two)
  }
  if (vehiclePhotoUpload_three) {
    createWorkFormData.append("photo3", vehiclePhotoUpload_three)
  }
  if (vehiclePhotoUpload_four) {
    createWorkFormData.append("photo4", vehiclePhotoUpload_four)
  }
  createWorkFormData.append("attendedDate", date);
  createWorkFormData.append("companyCode", "WAY4TRACK");
  createWorkFormData.append("unitCode", "WAY4");
  createWorkFormData.append("productName", productName);
  createWorkFormData.append("name", name);
  createWorkFormData.append("phoneNumber", phoneNumber);
  createWorkFormData.append("address", address);
  if (workStatus) {
    createWorkFormData.append("workStatus", workStatus);
  }
  if (paymentStatus) {
    createWorkFormData.append("paymentStatus", paymentStatus);
  }

  dispatch({ type: UPLOAD_DEVICE_INSTALL_REQUEST });

  console.log("createWorkFormData: ", createWorkFormData);

  try {
    // Attempt to fetch branches
    const { data } = await api.post(`/technician/handleTechnicianDetails`, createWorkFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("techWork : ",data.data)
    dispatch({ type: UPLOAD_DEVICE_INSTALL_SUCCESS, payload: data});
  } catch (error) {
    console.log("error : ", error)
    // If the error status is 500, try refreshing the token
    dispatch({ type: UPLOAD_DEVICE_INSTALL_FAILURE, payload: error.message });
  }
};


export const createDeviceInstall = (deviceInstallData) => async (dispatch) => {
  dispatch({ type: CREATE_DEVICE_INSTALL_REQUEST });
  try {
    dispatch({ type: CREATE_DEVICE_INSTALL_SUCCESS, payload: deviceInstallData });
  } catch (error) {
    console.log("error : ", error)
    // Handle other errors
    dispatch({ type: CREATE_DEVICE_INSTALL_FAILURE, payload: error.message });
  }
};

export const updateDeviceInstall = (updatedOrderData) => (dispatch) => {
  dispatch({
    type: UPDATE_DEVICE_INSTALL_REQUEST,
    payload: updatedOrderData, // The updated order data
  });
};

export const deleteDeviceInstall = () => (dispatch) => {
  dispatch({ type: DELETE_DEVICE_INSTALL_REQUEST, });
};
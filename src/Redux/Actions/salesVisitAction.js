import {
  CREATE_SALES_VISIT_SUCCESS,
  CREATE_SALES_VISIT_REQUEST,
  CREATE_SALES_VISIT_FAILURE,
  UPLOAD_SALES_VISIT_SUCCESS,
  UPLOAD_SALES_VISIT_REQUEST,
  UPLOAD_SALES_VISIT_FAILURE,
  UPDATE_SALES_VISIT_REQUEST,
  DELETE_SALES_VISIT_REQUEST,
} from "../Constants/salesVisitConstant";
import * as actionType from "../Constants/salesVisitConstant";
import api from "../../Api/api";

export const uploadSalesVisit = (create_salesPayload) => async (dispatch) => {

  const createSalesVisitData = new FormData();
  if (create_salesPayload.visitingCard_pick) {
    createSalesVisitData.append("photo1", vehiclePhoto_one)
  }
  if (create_salesPayload.client_pick) {
    createSalesVisitData.append("photo2", vehiclePhoto_two)
  }
  createSalesVisitData.append("date", create_salesPayload.date);
  createSalesVisitData.append("EstimateDate", create_salesPayload.EstimateDate);
  createSalesVisitData.append("products", create_salesPayload.products);
  createSalesVisitData.append("services", create_salesPayload.services);
  createSalesVisitData.append("companyCode", "WAY4TRACK");
  createSalesVisitData.append("unitCode", "WAY4");
  createSalesVisitData.append("clientName", create_salesPayload.clientName);
  createSalesVisitData.append("phoneNumber", create_salesPayload.phoneNumber);
  createSalesVisitData.append("address", create_salesPayload.address);

  console.log("createSalesVisitData: ", createSalesVisitData);
  dispatch({ type: UPLOAD_SALES_VISIT_REQUEST });


  try {
    // Attempt to fetch branches
    const { data } = await api.post(`/visits/handleVisitDetails`, createSalesVisitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: UPLOAD_SALES_VISIT_SUCCESS, payload: data.data });
  } catch (error) {
    console.log("error : ", error)
    // If the error status is 500, try refreshing the token
    dispatch({ type: UPLOAD_SALES_VISIT_FAILURE, payload: error.message });
  }
};


export const createSalesVisit = (salesVisitData) => async (dispatch) => {
  dispatch({ type: CREATE_SALES_VISIT_REQUEST });
  try {
    dispatch({ type: CREATE_SALES_VISIT_SUCCESS, payload: salesVisitData });
  } catch (error) {
    console.log("error : ", error)
    // Handle other errors
    dispatch({ type: CREATE_SALES_VISIT_FAILURE, payload: error.message });
  }
};

export const updateSalesVisit = (updatedOrderData) => (dispatch) => {
  dispatch({
    type: UPDATE_SALES_VISIT_REQUEST,
    payload: updatedOrderData, // The updated order data
  });
};

export const deleteSalesVisit = () => (dispatch) => {
  dispatch({ type: DELETE_SALES_VISIT_REQUEST, });
};
import {
    CREATE_RAISE_REQUEST_SUCCESS,
    CREATE_RAISE_REQUEST_REQUEST,
    CREATE_RAISE_REQUEST_FAIL,
    UPDATE_RAISE_REQUEST_SUCCESS,
    UPDATE_RAISE_REQUEST_REQUEST,
    UPDATE_RAISE_REQUEST_FAIL,
    FETCH_RAISE_REQUESTS_SUCCESS,
    FETCH_RAISE_REQUESTS_REQUEST,
    FETCH_RAISE_REQUESTS_FAIL,
    DELETE_RAISE_REQUESTS_SUCCESS,
    DELETE_RAISE_REQUESTS_REQUEST,
    DELETE_RAISE_REQUESTS_FAIL,
    RAISE_REQUEST_DETAIL_REQUEST,
    RAISE_REQUEST_DETAIL_SUCCESS,
    RAISE_REQUEST_DETAIL_FAIL,
} from "../Constants/raiseRequestConstant";

import * as actionTyes from "../Constants/raiseRequestConstant";
import api from "../../Api/api";

export const createRaiseRequest = (create_raiseRequestPayload) => async (dispatch) => {
    console.log("create_raiseRequestPayload : ",create_raiseRequestPayload)

    dispatch({ type: CREATE_RAISE_REQUEST_REQUEST });
    try {
        // Attempt to fetch RAISE_REQUESTS
        const { data } = await api.post(`/requests/handleRequestDetails`, create_raiseRequestPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("add request  ",data)
        dispatch({ type: CREATE_RAISE_REQUEST_SUCCESS, payload: data.data});
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_RAISE_REQUEST_FAIL, payload: error.message });
    }
};

export const updateRaiseRequest = (update_raiseRequestPayload) => async (dispatch) => {
    console.log("create_raiseRequestPayload : ",update_raiseRequestPayload)

    dispatch({ type: UPDATE_RAISE_REQUEST_REQUEST });
    try {
        // Attempt to fetch RAISE_REQUESTS
        const { data } = await api.post(`/requests/handleRequestDetails`, update_raiseRequestPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_RAISE_REQUEST_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_RAISE_REQUEST_FAIL, payload: error.message });
    }
};

export const fetchRaiseRequests = (getAll_raiseRequestPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_raiseRequestPayload;
    dispatch({ type: FETCH_RAISE_REQUESTS_REQUEST });
    try {
        // Attempt to fetch RAISE_REQUESTS
        const { data } = await api.post(`/requests/getAllRequestDetails`, getAll_raiseRequestPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("raiseRequest-mainData  success: ", data.data)
        dispatch({ type: FETCH_RAISE_REQUESTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_RAISE_REQUESTS_FAIL, payload: error.message });
    }
};

export const raiseRequestById = (get_raiseRequestPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_raiseRequestPayload;
    dispatch({ type: RAISE_REQUEST_DETAIL_REQUEST })
    try {
        // Attempt to fetch RAISE_REQUESTS
        const { data } = await api.post(`/requests/get-raiseRequest-by-id`, get_raiseRequestPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("raiseRequestData : ", data.data)
        dispatch({ type: RAISE_REQUEST_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: RAISE_REQUEST_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteRaiseRequestById = (delete_raiseRequestPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_raiseRequestPayload;
    dispatch({ type: DELETE_RAISE_REQUESTS_REQUEST })
    try {
        // Attempt to fetch RAISE_REQUESTS
        const { data } = await api.post(`/requests/delete-raiseRequest-by-id`, delete_raiseRequestPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("raiseRequestData : ", data.data)
        dispatch({ type: DELETE_RAISE_REQUESTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_RAISE_REQUESTS_FAIL, payload: error.message });
    }
}


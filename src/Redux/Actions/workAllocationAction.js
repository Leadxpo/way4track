import {
    CREATE_WORK_ALLOCATION_SUCCESS,
    CREATE_WORK_ALLOCATION_REQUEST,
    CREATE_WORK_ALLOCATION_FAIL,
    UPDATE_WORK_ALLOCATION_SUCCESS,
    UPDATE_WORK_ALLOCATION_REQUEST,
    UPDATE_WORK_ALLOCATION_FAIL,
    FETCH_WORK_ALLOCATIONS_SUCCESS,
    FETCH_WORK_ALLOCATIONS_REQUEST,
    FETCH_WORK_ALLOCATIONS_FAIL,
    DELETE_WORK_ALLOCATIONS_SUCCESS,
    DELETE_WORK_ALLOCATIONS_REQUEST,
    DELETE_WORK_ALLOCATIONS_FAIL,
    WORK_ALLOCATION_DETAIL_REQUEST,
    WORK_ALLOCATION_DETAIL_SUCCESS,
    WORK_ALLOCATION_DETAIL_FAIL,
} from "../Constants/workAllocationConstant";

import * as actionTyes from "../Constants/workAllocationConstant";
import api from "../../Api/api";

export const createWorkAllocation = (Payload) => async (dispatch) => {
    const {allocateTo, clientName,  slotDate, productDetails,description}= Payload;
    const create_workAllocationPayload={ staffId:allocateTo, clientId:clientName, otherInformation:description,serviceOrProduct:'products', date:slotDate,productDetails:productDetails, companyCode:"WAY4TRACK", unitCode:"WAY4"} ;
    console.log("Updated Data:", create_workAllocationPayload);

    dispatch({ type: CREATE_WORK_ALLOCATION_REQUEST });
    try {
        // Attempt to fetch WORK_ALLOCATIONS
        const { data } = await api.post(`/work-allocations/handleWorkAllocationDetails`, create_workAllocationPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_WORK_ALLOCATION_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_WORK_ALLOCATION_FAIL, payload: error.message });
    }
};

export const updateWorkAllocation = (update_workAllocationPayload) => async (dispatch) => {
    const {id,allocateTo, clientName,  slotDate, timeFixing ,productDetails}= Payload;
    const create_workAllocationPayload={id:id, staffId:allocateTo, clientId:clientName, otherInformation, date:slotDate,productDetails:productDetails, companyCode:"WAY4TRACK", unitCode:"WAY4"} ;
    dispatch({ type: UPDATE_WORK_ALLOCATION_REQUEST });
    try {
        // Attempt to fetch WORK_ALLOCATIONS
        const { data } = await api.post(`/work-allocations/handleWorkAllocationDetails`, update_workAllocationPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_WORK_ALLOCATION_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_WORK_ALLOCATION_FAIL, payload: error.message });
    }
};

export const fetchWorkAllocations = (getAll_workAllocationPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_workAllocationPayload;
    dispatch({ type: FETCH_WORK_ALLOCATIONS_REQUEST });
    try {
        // Attempt to fetch WORK_ALLOCATIONS
        const { data } = await api.post(`/technician/getBackendSupportWorkAllocation`, getAll_workAllocationPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("workAllocation-mainData  success: ", data.data)
        dispatch({ type: FETCH_WORK_ALLOCATIONS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_WORK_ALLOCATIONS_FAIL, payload: error.message });
    }
};

export const workAllocationById = (get_workAllocationPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_workAllocationPayload;
    dispatch({ type: WORK_ALLOCATION_DETAIL_REQUEST })
    try {
        // Attempt to fetch WORK_ALLOCATIONS
        const { data } = await api.post(`/workAllocation/get-workAllocation-by-id`, get_workAllocationPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("workAllocationData : ", data.data)
        dispatch({ type: WORK_ALLOCATION_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: WORK_ALLOCATION_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteWorkAllocationById = (delete_workAllocationPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_workAllocationPayload;
    dispatch({ type: DELETE_WORK_ALLOCATIONS_REQUEST })
    try {
        // Attempt to fetch WORK_ALLOCATIONS
        const { data } = await api.post(`/workAllocation/delete-workAllocation-by-id`, delete_workAllocationPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("workAllocationData : ", data.data)
        dispatch({ type: DELETE_WORK_ALLOCATIONS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_WORK_ALLOCATIONS_FAIL, payload: error.message });
    }
}


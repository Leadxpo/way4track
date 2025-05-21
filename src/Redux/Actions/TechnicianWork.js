import {
    CREATE_TECH_WORK_SUCCESS,
    CREATE_TECH_WORK_REQUEST,
    CREATE_TECH_WORK_FAIL,
    UPDATE_TECH_WORK_SUCCESS,
    UPDATE_TECH_WORK_REQUEST,
    UPDATE_TECH_WORK_FAIL,
    FETCH_TECH_WORKS_SUCCESS,
    FETCH_TECH_WORKS_REQUEST,
    FETCH_TECH_WORKS_FAIL,
    DELETE_TECH_WORKS_SUCCESS,
    DELETE_TECH_WORKS_REQUEST,
    DELETE_TECH_WORKS_FAIL,
    TECH_WORK_DETAIL_REQUEST,
    TECH_WORK_DETAIL_SUCCESS,
    TECH_WORK_DETAIL_FAIL,
} from "../Constants/technicianWorkConstant";

import * as actionTyes from "../Constants/technicianWorkConstant";
import api from "../../Api/api";

export const createTechnicianWork = (Payload) => async (dispatch) => {
    const {allocateTo, clientName,  slotDate, productDetails,description}= Payload;
    const create_technicianWorkPayload={ staffId:allocateTo, clientId:clientName, otherInformation:description,serviceOrProduct:'products', date:slotDate,productDetails:productDetails, companyCode:"WAY4TRACK", unitCode:"WAY4"} ;
    console.log("Updated Data:", create_technicianWorkPayload);

    dispatch({ type: CREATE_TECH_WORK_REQUEST });
    try {
        // Attempt to fetch TECH_WORKS
        const { data } = await api.post(`/technician/handleTechnicianWorkDetails`, create_technicianWorkPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_TECH_WORK_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_TECH_WORK_FAIL, payload: error.message });
    }
};

export const updateTechnicianWork = (update_technicianWorkPayload) => async (dispatch) => {
    const {id,allocateTo, clientName,  slotDate, timeFixing ,productDetails}= Payload;
    const create_technicianWorkPayload={id:id, staffId:allocateTo, clientId:clientName, otherInformation, date:slotDate,productDetails:productDetails, companyCode:"WAY4TRACK", unitCode:"WAY4"} ;
    dispatch({ type: UPDATE_TECH_WORK_REQUEST });
    try {
        // Attempt to fetch TECH_WORKS
        const { data } = await api.post(`/technician/handleTechnicianWorkDetails`, update_technicianWorkPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_TECH_WORK_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_TECH_WORK_FAIL, payload: error.message });
    }
};

export const fetchTechnicianWorks = (getAll_technicoianWorkPaylad) => async (dispatch) => {
    const { unitCode, companyCode,staffId } = getAll_technicoianWorkPaylad;
    dispatch({ type: FETCH_TECH_WORKS_REQUEST });
    try {
        // Attempt to fetch TECH_WORKS
        const { data } = await api.post(`/technician/getStaffWorkAllocation`, getAll_technicoianWorkPaylad, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: FETCH_TECH_WORKS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("errorAAA : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_TECH_WORKS_FAIL, payload: error.message });
    }
};

export const technicianWorkById = (get_technicianWorkPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_technicianWorkPayload;
    dispatch({ type: TECH_WORK_DETAIL_REQUEST })
    try {
        // Attempt to fetch TECH_WORKS
        const { data } = await api.post(`/technicianWork/get-technicianWork-by-id`, get_technicianWorkPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("technicianWorkData : ", data.data)
        dispatch({ type: TECH_WORK_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("errorsss : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: TECH_WORK_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteTechnicianWorkById = (delete_technicianWorkPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_technicianWorkPayload;
    dispatch({ type: DELETE_TECH_WORKS_REQUEST })
    try {
        // Attempt to fetch TECH_WORKS
        const { data } = await api.post(`/technicianWork/delete-technicianWork-by-id`, delete_technicianWorkPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("technicianWorkData : ", data.data)
        dispatch({ type: DELETE_TECH_WORKS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_TECH_WORKS_FAIL, payload: error.message });
    }
}


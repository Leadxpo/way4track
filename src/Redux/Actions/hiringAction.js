import {
    CREATE_HIRING_SUCCESS,
    CREATE_HIRING_REQUEST,
    CREATE_HIRING_FAIL,
    UPDATE_HIRING_SUCCESS,
    UPDATE_HIRING_REQUEST,
    UPDATE_HIRING_FAIL,
    FETCH_HIRINGS_SUCCESS,
    FETCH_HIRINGS_REQUEST,
    FETCH_HIRINGS_FAIL,
    DELETE_HIRINGS_SUCCESS,
    DELETE_HIRINGS_REQUEST,
    DELETE_HIRINGS_FAIL,
    HIRING_DETAIL_REQUEST,
    HIRING_DETAIL_SUCCESS,
    HIRING_DETAIL_FAIL,
} from "../Constants/hiringConstant";

import * as actionTyes from "../Constants/hiringConstant";
import api from "../../Api/api";

export const createHiring = (create_hiringPayload) => async (dispatch) => {

dispatch({ type: CREATE_HIRING_REQUEST });
try {
    // Attempt to fetch HIRINGS
    const { data } = await api.post(`/hiring/saveHiringDetailsWithResume`, create_hiringPayload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    dispatch({ type: CREATE_HIRING_SUCCESS, payload: data.data });
} catch (error) {
    console.log("error : ", error)
    // If the error status is 500, try refreshing the token
    // Handle other types of errors
    dispatch({ type: CREATE_HIRING_FAIL, payload: error.message });
}
};

export const updateHiring = (update_hiringPayload) => async (dispatch) => {
    console.log("update_hiringPayload :",update_hiringPayload)
    dispatch({ type: UPDATE_HIRING_REQUEST });
    try {
        // Attempt to fetch HIRINGS
        const { data } = await api.post(`/hiring/saveHiringDetailsWithResume`, update_hiringPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch({ type: UPDATE_HIRING_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_HIRING_FAIL, payload: error.message });
    }
};

export const fetchHirings = (getAll_hiringPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_hiringPayload;
    dispatch({ type: FETCH_HIRINGS_REQUEST });
    try {
        // Attempt to fetch HIRINGS
        const { data } = await api.post(`/hiring/getHiringDetails`, getAll_hiringPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("hiring-mainData  success: ", data.data)
        dispatch({ type: FETCH_HIRINGS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_HIRINGS_FAIL, payload: error.message });
    }
};

export const hiringById = (get_hiringPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_hiringPayload;
    dispatch({ type: HIRING_DETAIL_REQUEST })
    try {
        // Attempt to fetch HIRINGS
        const { data } = await api.post(`/hiring/get-hiring-by-id`, get_hiringPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("hiringData : ", data.data)
        dispatch({ type: HIRING_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: HIRING_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteHiringById = (delete_hiringPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_hiringPayload;
    dispatch({ type: DELETE_HIRINGS_REQUEST })
    try {
        // Attempt to fetch HIRINGS
        const { data } = await api.post(`/hiring/delete-hiring-by-id`, delete_hiringPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("hiringData : ", data.data)
        dispatch({ type: DELETE_HIRINGS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_HIRINGS_FAIL, payload: error.message });
    }
}


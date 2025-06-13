import {
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_FAIL,
    UPDATE_APPOINTMENT_SUCCESS,
    UPDATE_APPOINTMENT_REQUEST,
    UPDATE_APPOINTMENT_FAIL,
    FETCH_APPOINTMENTS_SUCCESS,
    FETCH_APPOINTMENTS_REQUEST,
    FETCH_APPOINTMENTS_FAIL,
    DELETE_APPOINTMENTS_SUCCESS,
    DELETE_APPOINTMENTS_REQUEST,
    DELETE_APPOINTMENTS_FAIL,
    APPOINTMENT_DETAIL_REQUEST,
    APPOINTMENT_DETAIL_SUCCESS,
    APPOINTMENT_DETAIL_FAIL,
} from "../Constants/appointmentConstant";

import * as actionTyes from "../Constants/appointmentConstant";
import api from "../../Api/api";

export const createAppointment = (create_appointmentPayload) => async (dispatch) => {
    console.log("create_appointmentPayload : ", create_appointmentPayload);
    dispatch({ type: CREATE_APPOINTMENT_REQUEST });
    try {
        // Attempt to fetch APPOINTMENTS
        const { data } = await api.post(`/appointment/handleAppointmentDetails`, create_appointmentPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_APPOINTMENT_FAIL, payload: error.message });
    }
};

export const updateAppointment = (update_appointmentPayload) => async (dispatch) => {
    const { id, appointmentId, appointmentType, name, assignedToId, date, slot, period, branchId, clientId, description, status, companyCode, unitCode } = update_appointmentPayload;
    dispatch({ type: UPDATE_APPOINTMENT_REQUEST });
    try {
        // Attempt to fetch APPOINTMENTS
        const { data } = await api.post(`/appointment/handleAppointmentDetails`, update_appointmentPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_APPOINTMENT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_APPOINTMENT_FAIL, payload: error.message });
    }
};

export const fetchAppointments = (getAll_appointmentPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_appointmentPayload;
console.log("rrr :",getAll_appointmentPayload)
    dispatch({ type: FETCH_APPOINTMENTS_REQUEST });
    try {
        // Attempt to fetch APPOINTMENTS
        const { data } = await api.post(`/appointment/getAllAppointmentDetails`, getAll_appointmentPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("appointment-mainData  success: ", data.data)
        dispatch({ type: FETCH_APPOINTMENTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_APPOINTMENTS_FAIL, payload: error.message });
    }
};

export const appointmentById = (get_appointmentPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_appointmentPayload;
    dispatch({ type: APPOINTMENT_DETAIL_REQUEST })
    try {
        // Attempt to fetch APPOINTMENTS
        const { data } = await api.post(`/appointment/get-appointment-by-id`, get_appointmentPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("appointmentData : ", data.data)
        dispatch({ type: APPOINTMENT_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: APPOINTMENT_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteAppointmentById = (delete_appointmentPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_appointmentPayload;
    dispatch({ type: DELETE_APPOINTMENTS_REQUEST })
    try {
        // Attempt to fetch APPOINTMENTS
        const { data } = await api.post(`/appointment/delete-appointment-by-id`, delete_appointmentPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("appointmentData : ", data.data)
        dispatch({ type: DELETE_APPOINTMENTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_APPOINTMENTS_FAIL, payload: error.message });
    }
}


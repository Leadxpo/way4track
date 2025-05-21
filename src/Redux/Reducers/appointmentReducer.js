import * as actionTypes from "../Constants/appointmentConstant";

const initialValue = {
    loading: false,
    appointments: [],
    error: ""
}

export const createAppointmentReducer = (state =  { loading: false, appointmentInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_APPOINTMENT_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_APPOINTMENT_SUCCESS:
            if (state.appointmentInfo === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                appointmentInfo: action.payload
            }
        case actionTypes.CREATE_APPOINTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const appointmentsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_APPOINTMENTS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_APPOINTMENTS_SUCCESS:
            if (state.appointments === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                appointments: action.payload
            }
        case actionTypes.FETCH_APPOINTMENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const appointmentDetailReducer = (state =  { loading: false, appointmentInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.APPOINTMENT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.APPOINTMENT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                appointmentInfo: action.payload
            }
        case actionTypes.APPOINTMENT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateAppointmentReducer = (state = { loading: false, appointment: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_APPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                appointment: action.payload
            }
        case actionTypes.UPDATE_APPOINTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const deleteAppointmentReducer = (state = { loading: false, appointment: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_APPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                appointment: action.payload
            }
        case actionTypes.DELETE_APPOINTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

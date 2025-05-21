import * as actionTypes from "../Constants/reportConstant";

const initialValue = {
    loading: false,
    reports: [],
    error: ""
}

export const createReportsReducer = (state = { loading: false, reportInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_REPORT_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_REPORT_SUCCESS:
            if (state.reports === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                reportInfo: action.payload
            }
        case actionTypes.CREATE_REPORT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const reportsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REPORTS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_REPORTS_SUCCESS:
            if (state.reports === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                reports: action.payload
            }
        case actionTypes.FETCH_REPORTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}
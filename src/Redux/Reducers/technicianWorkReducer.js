import * as actionTypes from "../Constants/technicianWorkConstant";

const initialValue = {
    loading: false,
    technicianWorks: [],
    error: ""
}

export const createTechnicianWorksReducer = (state = { loading: false, technicianWorkInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TECH_WORK_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_TECH_WORK_SUCCESS:
            if (state.technicianWorkInfo === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                technicianWorkInfo: action.payload
            }
        case actionTypes.CREATE_TECH_WORK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const technicianWorksReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TECH_WORKS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_TECH_WORKS_SUCCESS:
            if (state.technicianWorks === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                technicianWorks: action.payload
            }
        case actionTypes.FETCH_TECH_WORKS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const technicianWorkDetailReducer = (state =  { loading: false, technicianWorkInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.TECH_WORK_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.TECH_WORK_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                technicianWorkInfo: action.payload
            }
        case actionTypes.TECH_WORK_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateTechnicianWorkReducer = (state = { loading: false, technicianWork: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TECH_WORK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_TECH_WORK_SUCCESS:
            return {
                ...state,
                loading: false,
                technicianWork: action.payload
            }
        case actionTypes.UPDATE_TECH_WORK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const deleteTechnicianWorkReducer = (state = { loading: false, technicianWork: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_TECH_WORK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_TECH_WORK_SUCCESS:
            return {
                ...state,
                loading: false,
                technicianWork: action.payload
            }
        case actionTypes.DELETE_TECH_WORK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

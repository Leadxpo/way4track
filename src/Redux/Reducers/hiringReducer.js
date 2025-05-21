import * as actionTypes from "../Constants/hiringConstant";

const initialValue = {
    loading: false,
    hirings: [],
    error: ""
}

export const createHiringsReducer = (state = { loading: false, hiringInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_HIRING_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_HIRING_SUCCESS:
            if (state.hirings === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                hirings: action.payload
            }
        case actionTypes.CREATE_HIRING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const hiringsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HIRINGS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_HIRINGS_SUCCESS:
            if (state.hirings === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                hirings: action.payload
            }
        case actionTypes.FETCH_HIRINGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const hiringDetailReducer = (state =  { loading: false, hiringInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.HIRING_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.HIRING_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                hiringInfo: action.payload
            }
        case actionTypes.HIRING_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateHiringReducer = (state = { loading: false, hiring: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_HIRING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_HIRING_SUCCESS:
            return {
                ...state,
                loading: false,
                hiring: action.payload
            }
        case actionTypes.UPDATE_HIRING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const deleteHiringReducer = (state = { loading: false, hiring: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_HIRING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_HIRING_SUCCESS:
            return {
                ...state,
                loading: false,
                hiring: action.payload
            }
        case actionTypes.DELETE_HIRING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

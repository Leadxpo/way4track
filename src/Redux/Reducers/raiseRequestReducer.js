import * as actionTypes from "../Constants/raiseRequestConstant";

const initialValue = {
    loading: false,
    raiseRequests: [],
    error: ""
}

export const createRaiseRequestsReducer = (state = { loading: false, raiseRequestInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_RAISE_REQUEST_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_RAISE_REQUEST_SUCCESS:
            if (state.raiseRequestInfo === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                raiseRequestInfo: action.payload
            }
        case actionTypes.CREATE_RAISE_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const raiseRequestsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RAISE_REQUESTS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_RAISE_REQUESTS_SUCCESS:
            if (state.raiseRequests === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                raiseRequests: action.payload
            }
        case actionTypes.FETCH_RAISE_REQUESTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const raiseRequestDetailReducer = (state =  { loading: false, raiseRequestInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.RAISE_REQUEST_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.RAISE_REQUEST_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                raiseRequestInfo: action.payload
            }
        case actionTypes.RAISE_REQUEST_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateRaiseRequestReducer = (state = { loading: false, raiseRequest: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_RAISE_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_RAISE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                raiseRequest: action.payload
            }
        case actionTypes.UPDATE_RAISE_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const deleteRaiseRequestReducer = (state = { loading: false, raiseRequest: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_RAISE_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_RAISE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                raiseRequest: action.payload
            }
        case actionTypes.DELETE_RAISE_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

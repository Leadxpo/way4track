import * as actionTypes from "../Constants/subDealerConstant";

const initialValue = {
    loading: false,
    subdealers: [],
    error: ""
}

export const createSubdealersReducer = (state = { loading: false, subdealerInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_SUBDEALER_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_SUBDEALER_SUCCESS:
            if (state.subdealerInfo === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                subdealerInfo: action.payload
            }
        case actionTypes.CREATE_SUBDEALER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const subdealersReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SUBDEALERS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_SUBDEALERS_SUCCESS:
            if (state.subdealers === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                subdealers: action.payload
            }
        case actionTypes.FETCH_SUBDEALERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const subdealerDetailReducer = (state =  { loading: false, subdealerInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.SUBDEALER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.SUBDEALER_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                subdealerInfo: action.payload
            }
        case actionTypes.SUBDEALER_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateSubdealerReducer = (state = { loading: false, subdealer: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_SUBDEALER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_SUBDEALER_SUCCESS:
            return {
                ...state,
                loading: false,
                subdealer: action.payload
            }
        case actionTypes.UPDATE_SUBDEALER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const subdealersDropdownReducer = (state = { loading: false, subdealersDropdown: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SUBDEALERS_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_SUBDEALERS_DROPDOWN_SUCCESS:
            if (state.subdealersDropdown === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                subdealersDropdown: action.payload
            }
        case actionTypes.FETCH_SUBDEALERS_DROPDOWN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const deleteSubdealerReducer = (state = { loading: false, subdealer: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_SUBDEALER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_SUBDEALER_SUCCESS:
            return {
                ...state,
                loading: false,
                subdealer: action.payload
            }
        case actionTypes.DELETE_SUBDEALER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

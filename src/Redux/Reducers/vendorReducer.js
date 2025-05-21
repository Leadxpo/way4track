import * as actionTypes from "../Constants/vendorConstant";

const initialValue = {
    loading: false,
    vendors: [],
    error: ""
}

export const createVendorReducer = (state = { loading: false, vendorInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_VENDOR_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_VENDOR_SUCCESS:
            if (state.vendorInfo === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                vendorInfo: action.payload
            }
        case actionTypes.CREATE_VENDOR_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const vendorsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VENDORS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_VENDORS_SUCCESS:
            if (state.vendors === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                vendors: action.payload
            }
        case actionTypes.FETCH_VENDORS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const vendorDetailReducer = (state =  { loading: false, vendorInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.VENDOR_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.VENDOR_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                vendorInfo: action.payload
            }
        case actionTypes.VENDOR_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateVendorReducer = (state = { loading: false, vendor: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_VENDOR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_VENDOR_SUCCESS:
            return {
                ...state,
                loading: false,
                vendor: action.payload
            }
        case actionTypes.UPDATE_VENDOR_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const vendorsDropdownReducer = (state = { loading: false, vendorsDropdown: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VENDORS_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_VENDORS_DROPDOWN_SUCCESS:
            if (state.vendorsDropdown === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                vendorsDropdown: action.payload
            }
        case actionTypes.FETCH_VENDORS_DROPDOWN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const deleteVendorReducer = (state = { loading: false, vendor: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_VENDOR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_VENDOR_SUCCESS:
            return {
                ...state,
                loading: false,
                vendor: action.payload
            }
        case actionTypes.DELETE_VENDOR_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

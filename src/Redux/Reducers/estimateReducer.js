import * as actionTypes from "../Constants/estimateConstant";

const initialEstimateValue = {
    loading: false,
    estimates: [],
    error: ""
}

const initialInvoiceValue = {
    loading: false,
    invoices: [],
    error: ""
}

const initialRecieptValue = {
    loading: false,
    reciepts: [],
    error: ""
}

export const createEstimatesReducer = (state = { loading: false, estimateInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ESTIMATE_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_ESTIMATE_SUCCESS:
            if (state.estimates === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                estimates: action.payload
            }
        case actionTypes.CREATE_ESTIMATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const createInvoiceReducer = (state = { loading: false, invoiceInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_INVOICE_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_INVOICE_SUCCESS:
            if (state.estimates === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                estimates: action.payload
            }
        case actionTypes.CREATE_INVOICE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const createRecieptReducer = (state = { loading: false, recieptInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_RECIEPT_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_RECIEPT_SUCCESS:
            if (state.estimates === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                estimates: action.payload
            }
        case actionTypes.CREATE_RECIEPT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const estimatesReducer = (state = initialEstimateValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ESTIMATES_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_ESTIMATES_SUCCESS:
            if (state.estimates === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                estimates: action.payload
            }
        case actionTypes.FETCH_ESTIMATES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const invoicesReducer = (state = initialInvoiceValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INVOICES_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_INVOICES_SUCCESS:
            if (state.invoices === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                invoices: action.payload
            }
        case actionTypes.FETCH_INVOICES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const recieptsReducer = (state = initialRecieptValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RECIEPTS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_RECIEPTS_SUCCESS:
            if (state.reciepts === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                reciepts: action.payload
            }
        case actionTypes.FETCH_RECIEPTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const estimateDetailReducer = (state =  { loading: false, estimateInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.ESTIMATE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.ESTIMATE_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                estimateInfo: action.payload
            }
        case actionTypes.ESTIMATE_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const updateEstimateReducer = (state = { loading: false, estimate: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ESTIMATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_ESTIMATE_SUCCESS:
            return {
                ...state,
                loading: false,
                estimate: action.payload
            }
        case actionTypes.UPDATE_ESTIMATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const deleteEstimateReducer = (state = { loading: false, estimate: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_ESTIMATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_ESTIMATE_SUCCESS:
            return {
                ...state,
                loading: false,
                estimate: action.payload
            }
        case actionTypes.DELETE_ESTIMATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

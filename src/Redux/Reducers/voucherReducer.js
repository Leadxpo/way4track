import * as actionTypes from "../Constants/voucherConstant";

const initialValue = {
    loading: false,
    vouchers: [],
    error: ""
}

export const createVouchersReducer = (state = { loading: false, voucherInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_VOUCHER_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_VOUCHER_SUCCESS:
            if (state.voucherInfo === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                voucherInfo: action.payload
            }
        case actionTypes.CREATE_VOUCHER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const vouchersReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VOUCHERS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_VOUCHERS_SUCCESS:
            if (state.vouchers === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                vouchers: action.payload
            }
        case actionTypes.FETCH_VOUCHERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const voucher_paymentsReducer = (state = { loading: false, voucherPaymentsData: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VOUCHER_PAYMENTS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_VOUCHER_PAYMENTS_SUCCESS:
            if (state.voucherPaymentsData === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                voucherPaymentsData: action.payload
            }
        case actionTypes.FETCH_VOUCHER_PAYMENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const voucher_purchasesReducer = (state = { loading: false, voucherPurchasesData: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VOUCHER_PURCHASES_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_VOUCHER_PURCHASES_SUCCESS:
            if (state.voucherPurchasesData === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                voucherPurchasesData: action.payload
            }
        case actionTypes.FETCH_VOUCHER_PURCHASES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const voucher_ledgerReducer = (state = { loading: false, voucherledgersData: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VOUCHER_LEDGERS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_VOUCHER_LEDGERS_SUCCESS:
            if (state.voucherledgersData === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                voucherledgersData: action.payload
            }
        case actionTypes.FETCH_VOUCHER_LEDGERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const voucher_recieptReducer = (state = { loading: false, voucherRecieptsData: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VOUCHER_RECIEPTS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_VOUCHER_RECIEPTS_SUCCESS:
            if (state.voucherRecieptsData === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                voucherRecieptsData: action.payload
            }
        case actionTypes.FETCH_VOUCHER_RECIEPTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const voucher_daybookReducer = (state = { loading: false, voucherDaybookData: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VOUCHER_DAYBOOK_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_VOUCHER_DAYBOOK_SUCCESS:
            if (state.voucherDaybookData === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                voucherDaybookData: action.payload
            }
        case actionTypes.FETCH_VOUCHER_DAYBOOK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const voucherDetailReducer = (state =  { loading: false, voucherInfo: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.VOUCHER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.VOUCHER_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                voucherInfo: action.payload
            }
        case actionTypes.VOUCHER_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateVoucherReducer = (state = { loading: false, voucher: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_VOUCHER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_VOUCHER_SUCCESS:
            return {
                ...state,
                loading: false,
                voucher: action.payload
            }
        case actionTypes.UPDATE_VOUCHER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const deleteVoucherReducer = (state = { loading: false, voucher: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_VOUCHER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_VOUCHER_SUCCESS:
            return {
                ...state,
                loading: false,
                voucher: action.payload
            }
        case actionTypes.DELETE_VOUCHER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

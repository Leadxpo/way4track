import * as actionTypes from "../Constants/bankAccountConstant";

const initialState = {
    loading: false,
    bankAccounts: [],
    error: ""
}

export const createbankAccountReducer = (state = { loading: false, addedBankAccount: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_BANK_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CREATE_BANK_ACCOUNT_SUCCESS:
            if (state.addedBankAccount === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                addedBankAccount: action.payload
            }
        case actionTypes.CREATE_BANK_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const updatebankAccountReducer = (state = { loading: false, updatedBankAccount: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BANK_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.UPDATE_BANK_ACCOUNT_SUCCESS:
            if (state.updatedBankAccount === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                updatedBankAccount: action.payload
            }
        case actionTypes.UPDATE_BANK_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const deletebankAccountReducer = (state = { loading: false, deletedbankAccount: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_BANK_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_BANK_ACCOUNT_SUCCESS:
            if (state.deletedbankAccount === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                deletedbankAccount: action.payload
            }
        case actionTypes.DELETE_BANK_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const bankAccountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BANK_ACCOUNTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_BANK_ACCOUNTS_SUCCESS:
            if (state.bankAccounts === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                bankAccounts: action.payload
            }
        case actionTypes.FETCH_BANK_ACCOUNTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const bankAccountsDropdownReducer = (state = { loading: false, bankAccountsDropdown: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BANK_ACCOUNTS_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_BANK_ACCOUNTS_DROPDOWN_SUCCESS:
            if (state.bankAccountsDropdown === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                bankAccountsDropdown: action.payload
            }
        case actionTypes.FETCH_BANK_ACCOUNTS_DROPDOWN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const bankAccountDetailReducer = (state = { loading: false, bankAccount: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.BANK_ACCOUNT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.BANK_ACCOUNT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                bankAccount: action.payload
            }
        case actionTypes.BANK_ACCOUNT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state

    }
}


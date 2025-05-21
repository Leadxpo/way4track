import {
    CREATE_BANK_ACCOUNT_SUCCESS,
    CREATE_BANK_ACCOUNT_REQUEST,
    CREATE_BANK_ACCOUNT_FAIL,
    UPDATE_BANK_ACCOUNT_SUCCESS,
    UPDATE_BANK_ACCOUNT_REQUEST,
    UPDATE_BANK_ACCOUNT_FAIL,
    FETCH_BANK_ACCOUNTS_SUCCESS,
    FETCH_BANK_ACCOUNTS_REQUEST,
    FETCH_BANK_ACCOUNTS_FAIL,
    FETCH_BANK_ACCOUNTS_DROPDOWN_SUCCESS,
    FETCH_BANK_ACCOUNTS_DROPDOWN_REQUEST,
    FETCH_BANK_ACCOUNTS_DROPDOWN_FAIL,
    BANK_ACCOUNT_PRODUCTS_REQUEST,
    BANK_ACCOUNT_PRODUCTS_FAIL,
    BANK_ACCOUNT_PRODUCTS_SUCCESS,
    BANK_ACCOUNT_DETAIL_REQUEST,
    BANK_ACCOUNT_DETAIL_SUCCESS,
    BANK_ACCOUNT_DETAIL_FAIL,
} from "../Constants/bankAccountConstant";

import * as actionTyes from "../Constants/bankAccountConstant";
import api from "../../Api/api";

export const createBankAccount = (create_bankAccountPayload) => async (dispatch) => {
    const { unitCode, companyCode,name,accountType,accountNumber,branchId,ifscCode,phoneNumber,address,accountName,totalAmount } = create_bankAccountPayload;
    dispatch({ type: CREATE_BANK_ACCOUNT_REQUEST });

    try {
        // Attempt to fetch bankAccounts
        const { data } = await api.post(`/account/createAccount`,create_bankAccountPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    console.log("addedBank : ",data)
       
        dispatch({ type: CREATE_BANK_ACCOUNT_SUCCESS, payload: data});
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: CREATE_BANK_ACCOUNT_FAIL, payload: error.message });
    }
};

export const updateBankAccount = ( update_bankAccountPayload ) => async (dispatch) => {
    const {id, unitCode, companyCode,name,accountType,accountNumber,branchId,ifscCode,phoneNumber,address,accountName,totalAmount} = update_bankAccountPayload;
    dispatch({ type: UPDATE_BANK_ACCOUNT_REQUEST });
    try {
        // Attempt to fetch bankAccounts
        console.log("sss : ",update_bankAccountPayload)
        const { data } = await api.post(`/account/createAccount`,update_bankAccountPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("updatedBank : ",data)
        dispatch({ type: UPDATE_BANK_ACCOUNT_SUCCESS, payload: data});
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: UPDATE_BANK_ACCOUNT_FAIL, payload: error.message });
    }
};

export const fetchbankAccounts = (getAll_bankAccountPayload) => async (dispatch) => {
    const {unitCode, companyCode } = getAll_bankAccountPayload;

    dispatch({ type: FETCH_BANK_ACCOUNTS_REQUEST });

    try {
        // Attempt to fetch bankAccounts
        const { data } = await api.post(`account/getAccountsDetails`,getAll_bankAccountPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("reduxBankAccount : ",data);
        dispatch({ type: FETCH_BANK_ACCOUNTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: FETCH_BANK_ACCOUNTS_FAIL, payload: error.message });
    }
};

export const fetchbankAccountsDropDown = (bankAccountDropdownPayload) => async (dispatch) => {
    const {unitCode, companyCode } = bankAccountDropdownPayload;
console.log(unitCode, companyCode);
    dispatch({ type: FETCH_BANK_ACCOUNTS_DROPDOWN_REQUEST });

    try {
        // Attempt to fetch bankAccounts
        const { data } = await api.post(`/account/getAccountsDropDown`,bankAccountDropdownPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });

        dispatch({ type: FETCH_BANK_ACCOUNTS_DROPDOWN_SUCCESS, payload:  data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: FETCH_BANK_ACCOUNTS_DROPDOWN_FAIL, payload: error.message });
    }
};

export const productsByBankAccountId = (get_bankAccountProductsPayload) => async (dispatch) => {
    const {unitCode, companyCode, id } = get_bankAccountProductsPayload;
    dispatch({ type: BANK_ACCOUNT_PRODUCTS_REQUEST })
    try {
        // Attempt to fetch bankAccounts
        const { data } = await api.post(`/bankAccount/get-bankAccounteProducts-by-id`, get_bankAccountProductsPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("mainData  success : ", data.data)
        dispatch({ type: BANK_ACCOUNT_PRODUCTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: BANK_ACCOUNT_PRODUCTS_FAIL, payload: error.message });
    }
}

export const bankAccountById = (get_bankAccountByIdPayload) => async (dispatch) => {
    const {unitCode, companyCode, id } = get_bankAccountByIdPayload;

    dispatch({ type: BANK_ACCOUNT_DETAIL_REQUEST })
    try {
        // Attempt to fetch bankAccounts
        const { data } = await api.post(`/account/getAccountsDetailsById`, get_bankAccountByIdPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("mainData  success : ", data.data)
        dispatch({ type: BANK_ACCOUNT_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: BANK_ACCOUNT_DETAIL_FAIL, payload: error.message });
    }
}

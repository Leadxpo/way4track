import {
    CREATE_VOUCHER_SUCCESS,
    CREATE_VOUCHER_REQUEST,
    CREATE_VOUCHER_FAIL,
    UPDATE_VOUCHER_SUCCESS,
    UPDATE_VOUCHER_REQUEST,
    UPDATE_VOUCHER_FAIL,
    FETCH_VOUCHERS_SUCCESS,
    FETCH_VOUCHERS_REQUEST,
    FETCH_VOUCHERS_FAIL,
    FETCH_VOUCHER_PAYMENTS_FAIL,
    FETCH_VOUCHER_PAYMENTS_SUCCESS,
    FETCH_VOUCHER_PAYMENTS_REQUEST,
    FETCH_VOUCHER_RECIEPTS_FAIL,
    FETCH_VOUCHER_RECIEPTS_SUCCESS,
    FETCH_VOUCHER_RECIEPTS_REQUEST,
    FETCH_VOUCHER_PURCHASES_FAIL,
    FETCH_VOUCHER_PURCHASES_SUCCESS,
    FETCH_VOUCHER_PURCHASES_REQUEST,
    FETCH_VOUCHER_LEDGERS_FAIL,
    FETCH_VOUCHER_LEDGERS_SUCCESS,
    FETCH_VOUCHER_LEDGERS_REQUEST,
    FETCH_VOUCHER_DAYBOOK_FAIL,
    FETCH_VOUCHER_DAYBOOK_SUCCESS,
    FETCH_VOUCHER_DAYBOOK_REQUEST,
    DELETE_VOUCHERS_SUCCESS,
    DELETE_VOUCHERS_REQUEST,
    DELETE_VOUCHERS_FAIL,
    VOUCHER_DETAIL_REQUEST,
    VOUCHER_DETAIL_SUCCESS,
    VOUCHER_DETAIL_FAIL,
} from "../Constants/voucherConstant";

import * as actionTyes from "../Constants/voucherConstant";
import api from "../../Api/api";

export const createVoucher = (create_voucherPayload) => async (dispatch) => {
    const { name,quantity,branchId,role,purpose,creditAmount,amount,remainingAmount,paymentType,clientId,staffId,accountNumber,voucherType,generationDate,expireDate,shippingAddress,
        buildingAddress,hsnCode,GSTORTDS,SCST,CGST,subDealerId,vendorId,initialPayment,numberOfEmi,emiNumber,emiAmount,ifscCode,bankAccountNumber,paymentStatus,productType,companyCode,
        unitCode,voucherId,fromAccount,toAccount,createdAt,updatedAt,upiId,checkNumber,cardNumber} = create_voucherPayload;
    dispatch({ type: CREATE_VOUCHER_REQUEST });
    try {
        // Attempt to fetch VOUCHERS
        const { data } = await api.post(`/voucher/get-all-voucher`, create_voucherPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_VOUCHER_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_VOUCHER_FAIL, payload: error.message });
    }
};

export const updateVoucher = (update_voucherPayload) => async (dispatch) => {
    const {id, name,quantity,branchId,role,purpose,creditAmount,amount,remainingAmount,paymentType,clientId,staffId,accountNumber,voucherType,generationDate,expireDate,shippingAddress,
        buildingAddress,hsnCode,GSTORTDS,SCST,CGST,subDealerId,vendorId,initialPayment,numberOfEmi,emiNumber,emiAmount,ifscCode,bankAccountNumber,paymentStatus,productType,companyCode,
        unitCode,voucherId,fromAccount,toAccount,createdAt,updatedAt,upiId,checkNumber,cardNumber} = update_voucherPayload;
    dispatch({ type: UPDATE_VOUCHER_REQUEST });
    try {
        // Attempt to fetch VOUCHERS
        const { data } = await api.post(`/voucher/get-all-voucher`, update_voucherPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_VOUCHER_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_VOUCHER_FAIL, payload: error.message });
    }
};

export const fetchVouchers = (getAll_voucherPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_voucherPayload;
    dispatch({ type: FETCH_VOUCHERS_REQUEST });
    try {
        // Attempt to fetch VOUCHERS
        const { data } = await api.post(`/voucher/getAllVouchers`, getAll_voucherPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("voucher-mainData  success: ", data.data)
        dispatch({ type: FETCH_VOUCHERS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_VOUCHERS_FAIL, payload: error.message });
    }
};

export const fetchVouchersbyPayments = (getAll_paymentsPayload) => async (dispatch) => {
    const { unitCode, companyCode,voucherType } = getAll_paymentsPayload;
    dispatch({ type: FETCH_VOUCHER_PAYMENTS_REQUEST });
    try {
        // Attempt to fetch VOUCHER_PAYMENTS
        const { data } = await api.post(`/dashboards/getPaymentData`, getAll_paymentsPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("payments-mainData  success: ", data.data)
        dispatch({ type: FETCH_VOUCHER_PAYMENTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_VOUCHER_PAYMENTS_FAIL, payload: error.message });
    }
};

export const fetchVouchersbyPurchase = (getAll_paymentsPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_paymentsPayload;
    dispatch({ type: FETCH_VOUCHER_PURCHASES_REQUEST });
    try {
        // Attempt to fetch VOUCHER_PURCHASES
        const { data } = await api.post(`/dashboards/getPurchaseData`, getAll_paymentsPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("purchase-mainData  success: ", data.data)
        dispatch({ type: FETCH_VOUCHER_PURCHASES_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_VOUCHER_PURCHASES_FAIL, payload: error.message });
    }
};

export const fetchVouchersbyReciept = (getAll_paymentsReciept) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_paymentsReciept;
    dispatch({ type: FETCH_VOUCHER_RECIEPTS_REQUEST });
    try {
        // Attempt to fetch VOUCHER_RECIEPTS
        const { data } = await api.post(`/voucher/get-all-voucherPayments`, getAll_paymentsReciept, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("voucher-mainData  success: ", data.data)
        dispatch({ type: FETCH_VOUCHER_RECIEPTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_VOUCHER_RECIEPTS_FAIL, payload: error.message });
    }
};

export const fetchVouchersbyLedger = (getAll_paymentsLedger) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_paymentsLedger;
    dispatch({ type: FETCH_VOUCHER_LEDGERS_REQUEST });
    try {
        // Attempt to fetch VOUCHER_LEDGERS
        const { data } = await api.post(`/dashboards/getDetailLedgerData`, getAll_paymentsLedger, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("Ledger-mainData  success: ", data.data)
        dispatch({ type: FETCH_VOUCHER_LEDGERS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_VOUCHER_LEDGERS_FAIL, payload: error.message });
    }
};

export const fetchVouchersbyDayBook = (getAll_paymentsDayBook) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_paymentsDayBook;
    dispatch({ type: FETCH_VOUCHER_DAYBOOK_REQUEST });
    try {
        // Attempt to fetch VOUCHER_DAYBOOK
        const { data } = await api.post(`/dashboards/getDayBookData`, getAll_paymentsDayBook, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("dayBook-mainData  success: ", data.data)
        dispatch({ type: FETCH_VOUCHER_DAYBOOK_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_VOUCHER_DAYBOOK_FAIL, payload: error.message });
    }
};

export const voucherById = (get_voucherByIdPayload) => async (dispatch) => {
    const { unitCode, companyCode, voucherId } = get_voucherByIdPayload;
    dispatch({ type: VOUCHER_DETAIL_REQUEST })
    try {
        // Attempt to fetch VOUCHERS
        const { data } = await api.post(`/dashboards/getAllVouchers`, get_voucherByIdPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("vocherData : ",data.data)
        dispatch({ type: VOUCHER_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: VOUCHER_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteVoucherById = (delete_voucherPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_voucherPayload;
    dispatch({ type: DELETE_VOUCHERS_REQUEST })
    try {
        // Attempt to fetch VOUCHERS
        const { data } = await api.post(`/voucher/delete-voucher-by-id`, delete_voucherPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("voucherData : ", data.data)
        dispatch({ type: DELETE_VOUCHERS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_VOUCHERS_FAIL, payload: error.message });
    }
}


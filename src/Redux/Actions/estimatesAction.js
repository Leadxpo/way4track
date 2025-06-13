import {
    CREATE_ESTIMATE_SUCCESS,
    CREATE_ESTIMATE_REQUEST,
    CREATE_ESTIMATE_FAIL,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_REQUEST,
    CREATE_INVOICE_FAIL,
    CREATE_RECIEPT_SUCCESS,
    CREATE_RECIEPT_REQUEST,
    CREATE_RECIEPT_FAIL,
    UPDATE_ESTIMATE_SUCCESS,
    UPDATE_ESTIMATE_REQUEST,
    UPDATE_ESTIMATE_FAIL,
    FETCH_ESTIMATES_SUCCESS,
    FETCH_ESTIMATES_REQUEST,
    FETCH_ESTIMATES_FAIL,
    FETCH_INVOICES_SUCCESS,
    FETCH_INVOICES_REQUEST,
    FETCH_INVOICES_FAIL,
    FETCH_RECIEPTS_SUCCESS,
    FETCH_RECIEPTS_REQUEST,
    FETCH_RECIEPTS_FAIL,
    DELETE_ESTIMATES_SUCCESS,
    DELETE_ESTIMATES_REQUEST,
    DELETE_ESTIMATES_FAIL,
    ESTIMATE_DETAIL_REQUEST,
    ESTIMATE_DETAIL_SUCCESS,
    ESTIMATE_DETAIL_FAIL,
    INVOICE_DETAIL_REQUEST,
    INVOICE_DETAIL_SUCCESS,
    INVOICE_DETAIL_FAIL,
} from "../Constants/estimateConstant";

import * as actionTyes from "../Constants/estimateConstant";
import api from "../../Api/api";

export const createEstimate = (create_estimatePayload, estimatePDF) => async (dispatch) => {
    const { clientId, buildingAddress, estimateDate, expireDate, productOrService, description, totalAmount, companyCode, unitCode, productDetails,
        estimateId } = create_estimatePayload;
    const creatEstimateformData = new FormData();
    creatEstimateformData.append('clientId', clientId);
    creatEstimateformData.append('buildingAddress', buildingAddress);
    creatEstimateformData.append('estimateDate', estimateDate);
    creatEstimateformData.append('expireDate', expireDate);
    creatEstimateformData.append('productOrService', productOrService);
    creatEstimateformData.append('description', description);
    creatEstimateformData.append('totalAmount', totalAmount);
    creatEstimateformData.append('description', description);
    creatEstimateformData.append('companyCode', companyCode);
    creatEstimateformData.append('unitCode', unitCode);
    creatEstimateformData.append('productDetails', productDetails);
    creatEstimateformData.append('estimatePdfUrl', estimatePDF);

    dispatch({ type: CREATE_ESTIMATE_REQUEST });
    try {
        // Attempt to fetch ESTIMATES
        const { data } = await api.post(`/estimate/handleEstimateDetails`, create_estimatePayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("create estimaresponse : ", data)
        dispatch({ type: CREATE_ESTIMATE_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_ESTIMATE_FAIL, payload: error.message });
    }
};

export const createReciept = (create_recieptPayload) => async (dispatch) => {
    const { clientId, buildingAddress, estimateDate, expireDate, productOrService, description, totalAmount, companyCode, unitCode, products, estimateId } = create_recieptPayload;
    dispatch({ type: CREATE_RECIEPT_REQUEST });
    try {
        // Attempt to fetch RECIEPTS
        const { data } = await api.post(`/reciept/get-all-reciept`, create_recieptPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_RECIEPT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_RECIEPT_FAIL, payload: error.message });
    }
};

export const createInvoice = (create_invoicePayload) => async (dispatch) => {
    const { clientId, buildingAddress, estimateDate, expireDate, productOrService, description, totalAmount, companyCode, unitCode, products, estimateId } = create_invoicePayload;
    console.log("createInvoice_payload : ", create_invoicePayload)

    dispatch({ type: CREATE_INVOICE_REQUEST });
    try {
        // Attempt to fetch INVOICES
        const { data } = await api.post(`/estimate/handleEstimateDetails`, create_invoicePayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_INVOICE_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_INVOICE_FAIL, payload: error.message });
    }
};

export const updateEstimate = (update_estimatePayload) => async (dispatch) => {
    const { clientId, buildingAddress, estimateDate, expireDate, productOrService, description, totalAmount, companyCode, unitCode, products, estimateId } = update_estimatePayload;
    dispatch({ type: UPDATE_ESTIMATE_REQUEST });
    try {
        // Attempt to fetch ESTIMATES
        const { data } = await api.post(`/estimate/get-all-estimate`, update_estimatePayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_ESTIMATE_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_ESTIMATE_FAIL, payload: error.message });
    }
};

export const fetchEstimates = (getAll_estimatePayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_estimatePayload;
    dispatch({ type: FETCH_ESTIMATES_REQUEST });
    try {
        // Attempt to fetch ESTIMATES
        const { data } = await api.post(`/estimate/getAllEstimateDetails`, getAll_estimatePayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const rrr = data.data.filter(item => {
            return item.invoiceId === null || item.invoiceId === '' || item.invoiceId === undefined;
        });
        console.log("estimate data : ", rrr)
        dispatch({ type: FETCH_ESTIMATES_SUCCESS, payload: rrr });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_ESTIMATES_FAIL, payload: error.message });
    }
};

export const fetchInvioces = (getAll_invoicePayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_invoicePayload;
    dispatch({ type: FETCH_INVOICES_REQUEST });
    try {
        // Attempt to fetch INVOICES
        const { data } = await api.post(`/estimate/getAllEstimateDetails`, getAll_invoicePayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const rrr = data.data.filter(item => {
            return item.invoiceId !== null || item.invoiceId !== '' || item.invoiceId !== undefined;
        });
        console.log("invoice data : ", rrr)

        dispatch({ type: FETCH_INVOICES_SUCCESS, payload: rrr });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_INVOICES_FAIL, payload: error.message });
    }
};

export const fetchReciepts = (getAll_recieptPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_recieptPayload;
    dispatch({ type: FETCH_RECIEPTS_REQUEST });
    try {
        // Attempt to fetch RECIEPTS
        const { data } = await api.post(`/dashboards/getReceiptData`, getAll_recieptPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("reciept data : ", data)
        dispatch({ type: FETCH_RECIEPTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_RECIEPTS_FAIL, payload: error.message });
    }
};

export const estimateById = (get_estimatePayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_estimatePayload;
    dispatch({ type: ESTIMATE_DETAIL_REQUEST })
    try {
        // Attempt to fetch ESTIMATES
        const { data } = await api.post(`/estimate/get-estimate-by-id`, get_estimatePayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("estimateData : ", data.data)
        dispatch({ type: ESTIMATE_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: ESTIMATE_DETAIL_FAIL, payload: error.message });
    }
}

export const invoiceById = (get_invoicePayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_invoicePayload;
    dispatch({ type: INVOICE_DETAIL_REQUEST })
    try {
        // Attempt to fetch INVOICES
        const { data } = await api.post(`/invoice/get-invoice-by-id`, get_invoicePayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("invoiceData : ", data.data)
        dispatch({ type: INVOICE_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: INVOICE_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteEstimateById = (delete_estimatePayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_estimatePayload;
    dispatch({ type: DELETE_ESTIMATES_REQUEST })
    try {
        // Attempt to fetch ESTIMATES
        const { data } = await api.post(`/estimate/delete-estimate-by-id`, delete_estimatePayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("estimateData : ", data.data)
        dispatch({ type: DELETE_ESTIMATES_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_ESTIMATES_FAIL, payload: error.message });
    }
}


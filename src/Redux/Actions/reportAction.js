import {
    CREATE_REPORT_SUCCESS,
    CREATE_REPORT_REQUEST,
    CREATE_REPORT_FAIL,
    FETCH_REPORTS_SUCCESS,
    FETCH_REPORTS_REQUEST,
    FETCH_REPORTS_FAIL,
} from "../Constants/reportConstant";

import * as actionTyes from "../Constants/reportConstant";
import api from "../../Api/api";

export const createReport = (create_reportPayload) => async (dispatch) => {
    const { unitCode, companyCode, reportsName, assetPhoto, reportsAmount, assetType, quantity, branchId, description, purchaseDate, voucherId, paymentType, initialPayment, numberOfEmi, emiNumber, emiAmount } = create_reportPayload;
    dispatch({ type: CREATE_REPORT_REQUEST });
    try {
        // Attempt to fetch REPORTS
        const { data } = await api.post(`/report/get-all-report`, create_reportPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_REPORT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_REPORT_FAIL, payload: error.message });
    }
};


export const fetchReports = (getAll_reportPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_reportPayload;
    dispatch({ type: FETCH_REPORTS_REQUEST });
    try {
        // Attempt to fetch REPORTS
        const { data } = await api.post(`/report/get-all-report`, getAll_reportPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("report-mainData  success: ", data.data)
        dispatch({ type: FETCH_REPORTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_REPORTS_FAIL, payload: error.message });
    }
};

